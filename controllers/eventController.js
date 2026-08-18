const {asyncHandler, ok, okList} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Event = require('../models/eventModel');

// GET - /api/events
const listEvents = asyncHandler(async (req, res)=> {
    const {category, city, startDate, endDate, search} = req.query;
    let filter = {};

    if(category) filter.category = category;
    if(city) filter.city = city;
    if(startDate || endDate){
        filter.date = {};
        if(startDate) 
            filter.date.$gte = new Date(startDate);
        if(endDate) 
            filter.date.$lte = new Date(endDate);
    };
    if (search) {
    //--Text Search--
    filter.$or = [
      {
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ]};
    //--Pagination--
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const pageNum = page >= 1 && page <= 10
    ? page
    : 1
    const limitNum = limit >= 1 && limit <= 50
    ? limit
    : 10

    const skip = (pageNum - 1) * limitNum;


    //--Sorting--
    const sortBy = req.query.sortBy === 'registrations' ? 'registrationCount' : 'date';
    const order = req.query.order === 'desc' ? -1 : 1;
    const sort = {[sortBy]: order}
    
    
    const [events, total] = await Promise.all([
        Event.find(filter).populate('category').sort(sort).skip(skip).limit(limitNum),
        Event.countDocuments(filter)
    ]);

    okList(res, { data: events, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
});

// GET /api/events/:id
const getEvent = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const event = await Event.findById(id).populate('category').populate('organizer');
    if (!event) 
        throw new AppError('Event Not Found', 404);
    ok(res, event, 'Event Fetched Successfully');
});
// POST - /api/events
const createEvent = asyncHandler(async (req, res)=> {
    const newEvent = await Event.create({...req.body, organizer: req.user._id});
    await newEvent.populate('category');
    ok(res, newEvent, 'New Event Created Successfully', 201);
});

// PATCH - /api/events/:id
const updateEvent = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate('category');
    if (!event) throw new AppError('Event Not Found', 404);
    ok(res, event, 'Events Updated Successfully');
});

// DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res)=> {
    const {id} = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if(!deletedEvent) throw new AppError('Event Not Found', 404);
    ok(res, null, 'Event Deleted Successfully');
});

module.exports = {
    listEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};
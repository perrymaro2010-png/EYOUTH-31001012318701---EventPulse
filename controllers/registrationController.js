const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Event = require('../models/eventModel');
const Registration = require('../models/registrationModel');

// POST - /api/registration
const reserve = asyncHandler(async (req, res)=>{
    const {eventID} = req.body;
    const event = await Event.findById(eventID);
    if (!event) throw new AppError('Event Not Found', 404);

    const existentBooking = await Registration.findOne({
        attendee: req.user._id,
        event: eventID,
    });
    if(existentBooking) throw new AppError('You have already booked for this event', 409);

    let booked;
    if(event.registrationCount < event.capacity){
        booked = await Registration.create({user: req.user._id, event});
        event.registrationCount += 1;
    } else {
        throw new AppError('This event is fully booked', 409);
    };

    await event.save();
    await booked.populate('event');

    ok(res, booked, 'Event reserved successfully', 201);
});

// GET - /api/registration/me
const getRegistration = asyncHandler(async (req, res)=> {
    const registration = await Registration.find({
        user: req.user._id,
    }).populate('event');
    ok(res, registration, 'Reservations Fetched Successfully');
});


// DELETE - /api/registration/:eventID
const cancelRegistration = asyncHandler(async (req, res)=> {
    const registration = await Registration.findById(req.params.id);
    if(!registration) throw new AppError('Reservation Not Found', 404);

    if(registration.user.toString() !== req.user._id.toString())
        throw new AppError('You are not allowed to cancel this reservation', 403);

    await registration.save();

    await Event.findByIdAndUpdate(registration.event, {$inc: {registrationCount: -1}});
    ok(res, null, 'Reservation Deleted Successfully');
});

module.exports = {
    reserve,
    getRegistration,
    cancelRegistration
};
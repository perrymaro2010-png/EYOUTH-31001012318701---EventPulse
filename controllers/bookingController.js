const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Event = require('../models/eventModel');
const Booking = require('../models/bookingModel');

// POST - /api/bookings
const reserve = asyncHandler(async (req, res)=>{
    const {eventID} = req.body;
    const event = await Event.findById(eventID);
    if (!event) throw new AppError('Event Not Found', 404);

    const existentBooking = await Booking.findOne({
        user: req.user._id,
        event: eventID,
        status: 'confirmed'
    });
    if(existingBooking) throw new AppError('You have already booked for this event', 409);

    if(event.registrationCount < event.capacity){
        const booked = await Booking.create({user: req.user._id, event, status: 'confirmed'});
        event.registrationCount += 1;
    } else {
        throw new AppError('This event is fully booked', 409);
    };

    await event.save();
    await booked.populate('event');

    ok(res, booked, 'Event reserved successfully', 201);
});

// GET - /api/bookings/me
const listBookings = asyncHandler(async (req, res)=> {
    const booking = await Booking.find({
        user: req.user._id,
        status: 'confirmed'
    }).populate('event');
    if(!booking.length) throw new AppError('No Bookings Found', 404);
    ok(res, booking, 'Reservations Fetched Successfully');
});

// GET - /api/bookings/:id
const getBooking = asyncHandler(async (req, res)=>{
    const booking = await Booking.findOne({
        user: req.user._id,
        event: req.params.id,
        status: 'confirmed'
    });
    if(!booking) throw new AppError('Reservation Not Found', 404);

    ok(res, booking, 'Reservation Fetched Successfully');
});

// DELETE - /api/bookings/:id
const cancelBooking = asyncHandler(async (req, res)=> {
    const booking = await Booking.findOne({
        user: req.user._id,
        event: req.params.id,
        status: 'confirmed'
    });
    if(!booking) throw new AppError('Reservation Not Found', 404);
    booking.status = 'canceled';
    await booking.save();

    await Event.findByIdAndUpdate(booking.event, {$inc: {registrationCount: -1}});
    ok(res, null, 'Reservation Deleted Successfully');
});

module.exports = {
    reserve,
    listBookings,
    getBooking,
    cancelBooking
};
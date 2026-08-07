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
    if(existentBooking) throw new AppError('You have already booked for this event', 409);

    let booked;
    if(event.registrationCount < event.capacity){
        booked = await Booking.create({user: req.user._id, event, status: 'confirmed'});
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
    ok(res, booking, 'Reservations Fetched Successfully');
});


// DELETE - /api/bookings/:eventID
const cancelBooking = asyncHandler(async (req, res)=> {
    const booking = await Booking.findById(req.params.id);
    if(!booking) throw new AppError('Reservation Not Found', 404);

    if(booking.user.toString() !== req.user._id.toString())
        throw new AppError('You are not allowed to cancel this reservation', 403);

    if(booking.status === 'cancelled')
        throw new AppError('Reservation Already Cancelled', 400);

    booking.status = 'cancelled';
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
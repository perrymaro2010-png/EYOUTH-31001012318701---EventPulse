const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User name is required']
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event field is required']
    },
    status:{
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, {timestamps: true});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
const mongoose = require('mongoose');
require('./userModel');
require('./eventModel');
const registrationSchema = new mongoose.Schema({
    attendee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User name is required']
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event field is required']
    }
}, {timestamps: true});


registrationSchema.index({event: 1, attendee: 1}, {unique: true});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
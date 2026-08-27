const mongoose = require('mongoose');
require('./categoryModel');
const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: [true, 'Event name is required']
    },
    description:{
        type: String,
        trim: true,
        minLength: [5, 'Description must exceed 5 characters'],
        required: [true, 'Description is required.']
    },
    city:{
        type: String,
        required: [true, 'City name is required'],
        trim: true,
        minLength: [3, 'City name must be at least 3 characters'],

    },
    venue: {
        type: String,
        trim: true,
        required: [true, 'Venue name is required']
    },
    capacity:{
        type: Number,
        required: true,
        min: 1,
        default: 50
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:[true, 'Category is a required field']
    },
    date:{
        type: Date,
        required: [true, 'Date field is required']
    },
    registrationCount:{
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User name is required']
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event field is required']
    },
    message:{
        type: String,
        required: [true, 'Message field is required'],
    },
    sentAt:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
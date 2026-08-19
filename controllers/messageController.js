const {asyncHandler, ok} = require('../utils/asyncHandler');
const io = require('socket')
const AppError = require('../utils/AppError');
const Message = require('../models/messageModel');

// GET /api/announcements/:eventID

const listMessages = asyncHandler(async (req, res)=> {
    const eventID = req.params.eventID;
    const messages = await Message.find({event: id}).populate('sender', 'name email role').sort({createdAt: -1});

    ok(res, messages, 'Messages Fetched Successfully');
});

// POST - /api/announcements
const announce = asyncHandler(async(req, res)=> {
    const { event: eventID, text } = req.body;
    const io = req.app.get('io');
    const message = await Message.create({
        sender: req.user._id,
        event,
        text,
    });
    await message.populate('sender', 'name role').populate('event', 'title');
    const messages = await Message.find({event});
    
    io.to(event).emit("announcement", message);
})


module.exports = {
    listMessages
};
const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Message = require('../models/messageModel');

// GET - /api/events/:id/messages

const listMessages = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const messages = await Message.find({event: id}).populate('sender', 'name role').sort({createdAt: 1});

    ok(res, messages, 'Messages Fetched Successfully');
});


module.exports = {
    listMessages
};
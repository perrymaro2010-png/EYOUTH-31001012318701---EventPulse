const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const User = require('./models/userModel');
const Message = require('./models/messageModel');


// function to create new server for socket.io
const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: { 'origin': '*' }
    });
    // function to check metadata within request header
    // check for user with this token
    io.use(async (socket, next) => {
        try {

            const token = socket.handshake.auth?.token;
            if (!token)
                return next(new Error('No token provided'));

            const decoded = jwt.verify(token, config.jwtSecret);
            const user = await User.findById(decoded.id);
            if (!user) return next(new Error('User not found'));

            socket.user = user;
            next();
        } catch (err) {
            next(new Error('Invalid or expired token'));
        }
    });

    // listen for new users connecting
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} is now connected!`);

        // attendee joins a room
        socket.on('join-event', (eventID) => {
            socket.join(eventID);
            console.log(`Socket ${socket.id} joined event: ${eventID}`);
        });

        // admin can broadcast a message
        socket.on('broadcast', async ({ eventID, message }) => {
            if (socket.user.role !== 'admin') {
                return socket.emit('errorMessage', 'Only admins can broadcast');
            }

            try {
                const saved = await Message.create({
                    sender: socket.user._id,
                    event: eventID,
                    text
                });

                io.to(`event: ${eventID}`).emit('announcement', {
                    _id: saved._id,
                    sender: saved.sender,
                    event: saved.event,
                    message: saved.text,
                });
            } catch (err) {
                socket.emit('errorMessage', 'Failed to broadcast message');
            }
        });

        // disconnect
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id} (user: ${socket.user._id})`);
        });
    });
    return io;
};


module.exports = initSocket;
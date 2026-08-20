const config = require('./config/config');
const http = require('http');
const express = require('express');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db/connect');
const initSocket = require('./socket');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

app.use(errorHandler);

// create server to combine with socket.io
const server = http.createServer(app);
initSocket(server);

const start = async ()=> {
    try {
        await connectDB();
        server.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();
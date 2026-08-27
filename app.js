const config = require('./config/config');
const http = require('http');
const express = require('express');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', messageRoutes);


app.get('/health', (req, res)=>{
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1? 'connected': 'disconnected';

    res.status(200).json({
        status: 'success',
        environment: config.isDev ? 'development' : 'production',
        uptime: process.uptime(),
        database: dbStatus
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});



app.use(errorHandler);


// create server to combine with socket.io
const initSocket = require('./socket');
const server = http.createServer(app);
const io = initSocket(server);
app.set('io', io);

connectDB();

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

module.exports = app;

if (require.main === module){
    start();
}
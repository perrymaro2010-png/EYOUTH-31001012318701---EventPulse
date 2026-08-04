const config = require('../config/config');
const mongoose = require('mongoose');
const connectDB = async ()=>{
    console.log("Connecting to MongoDB...");
    try{
        await mongoose.connect(config.mongoURI);
        console.log('Connection success!');
    } catch (err) {
        console.warn('Connection failure!');
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
require('dotenv').config();

const required = ['MONGO_URI','JWT_SECRET','JWT_EXPIRES_IN'];
const missing = required.filter((key)=> !process.env[key]);

if(missing.length > 0){
    console.error(`Missing .env variables: ${missing}`);
    process.exit(1);
}

module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    isDev: process.env.NODE_ENV === "development",
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES_IN
};
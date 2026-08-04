const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpires} = require('../config/config');

const generateToken = (id, role) =>{
    return jwt.sign({id, role}, jwtSecret, {expiresIn: jwtExpires})
};

module.exports = generateToken;
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        minLength: 5
    }
}, {timestamps: true});


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
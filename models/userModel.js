const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'User name is required']
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required.']
    },
    // to be hashed
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be 8 characters'],
        select: false
    },
    role:{
        type: String,
        enum: ['attendee', 'admin'],
        default: 'attendee',
    },
}, {
    timestamps: true,
    toJSON: true,
    toObject: true
});

userSchema.pre('save', async function(){
    if(!this.isModified('password'))
        return next();
    
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (pass) {
    return bcrypt.compare(pass, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
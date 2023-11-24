const mongoose = require('mongoose');
var validator = require('validator');
const userRole = require('../utils/userRoles');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , 'filed must be a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRole.ADMIN, userRole.USER, userRole.MANAGER],
        default: userRole.USER
    },
    avatar: {
        type: String,
        default: 'uploads/profil.jpg',
    }


})

module.exports = mongoose.model('User', userSchema);
const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User',  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    }
}));

function validateUser(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = User; 
exports.validate = validateUser;
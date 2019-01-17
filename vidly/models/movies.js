const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 50,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0, 
        max: 255,
        trim: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0, 
        max: 255,
        trim: true
    }
});

const Movie = mongoose.model('Movie', movieSchema); 

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.objectId().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;

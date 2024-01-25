
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: String,
    description: String,
    poster_image: String,
    genre: Array,
    release_year: Number,
    release_date: String,
    director: String,
    rating: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
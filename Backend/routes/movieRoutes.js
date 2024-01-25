
const express = require('express');
const movieRouter = express.Router();
const movieController = require('../controllers/movieController');
const {authenticateUser}=require("../middleware/authMiddleware")

// Movie routes
movieRouter.get('/', movieController.getMovies);
movieRouter.get('/:movieId', movieController.getMovieById);
// Protected Routes(requires Authentication)
movieRouter.post('/', authenticateUser,movieController.addMovie);
movieRouter.put('/:movieId', authenticateUser,movieController.updateMovie);
movieRouter.delete('/:movieId', authenticateUser,movieController.deleteMovie);


module.exports = {movieRouter};
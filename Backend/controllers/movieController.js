
const {Movie} = require('../models/Movie');

// CRUD operations for Movie
// Adding a Movie
const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body)

    await movie.save()
    res.status(201).send({message:"Movie Added Successfully",movie});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Movies
const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find()
      res.status(200).send({message:"Retrieved Movies Successfully",movies});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Getting A Movie Detail
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).send({message:"Retrieved Movie Successfully",movie});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Updating Movie Details
const updateMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).send({message:"Movie Details Updated",movie});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
//   Deleting a Movie
  const deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie
};
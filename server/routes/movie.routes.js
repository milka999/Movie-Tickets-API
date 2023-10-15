const express = require('express');
const movieRouter = express.Router();
const movieController = require('../controllers/movie.controller');

movieRouter.get('/', movieController.getMovies);

movieRouter.get('/:id', movieController.getMovie);

movieRouter.post('/', movieController.addMovie);

movieRouter.patch('/:id', movieController.updateMovie);

movieRouter.delete('/:id', movieController.deleteMovie);

module.exports = movieRouter;
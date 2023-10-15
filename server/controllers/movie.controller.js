const Movie = require('../models/movie.model');

async function getMovies(req, res, next){
    let movies;
    try{
        movies = await Movie.getAllMovies();
    }catch(error){
        return next(error);
    }

    res.json({movies: movies});
}

async function getMovie(req, res, next) {
    const movieId = parseInt(req.params.id.split(':')[1]);
    let movie;
    console.log(movieId);
    try{
        movie = await Movie.find(movieId);
    }catch(error) {
        return next(error);
    }

    res.json({movie: movie});
}

async function addMovie(req, res, next){
    const title = req.body.title;
    const poster = req.body.poster;
    const description = req.body.description;
    const imdb = req.body.imdb;
    const director = req.body.director;
    const actors = req.body.actors;
    const duration = req.body.duration;
    const start_date = (new Date(req.body.start_date)).toISOString();
    const genre = parseInt(req.body.genre);
    const rating = parseInt(req.body.rating);
    const movie = new Movie(title, poster, description, imdb, director, actors, duration, start_date, genre, rating);
    try {
        await movie.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Added new movie', movie: movie});
}

async function updateMovie(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    const title = req.body.title;
    const poster = req.body.poster;
    const description = req.body.description;
    const imdb = req.body.imdb;
    const director = req.body.director;
    const actors = req.body.actors;
    const duration = req.body.duration;
    const start_date = (new Date(req.body.start_date)).toISOString();
    const genre = parseInt(req.body.genre);
    const rating = parseInt(req.body.rating);
    const movie = new Movie(title, poster, description, imdb, director, actors, duration, start_date, genre, rating, id);
    try {
        await movie.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Updated movie', movie: movie});
}

async function deleteMovie(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    //const movie  = new Movie(null, id);
    try{
        await Movie.delete(id);
    }catch(error) {
        return next(error);
    }

    res.json({message: 'Movie deleted'});
}

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie,
    addMovie: addMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie
}
const db  = require('../util/db.server');

//DODAJ FILTER

class Movie {
    constructor(title, poster, description, imdb, director, actors, duration, start_date, genre, rating, /*projections,*/ id){
        this.title = title,
        this.poster = poster,  
        this.description = description,
        this.imdb = imdb,
        this.director = director,
        this.actors = actors,
        this.duration = duration,
        this.start_date = start_date,
        this.genre = genre,
        this.rating = rating
        //this.projections = projections,
        this.id = id
    } 

    static async getAllMovies(){
        const movies = await db.movie.findMany();
        return movies.map((movie) => {
            return new Movie(movie.title, movie.poster, movie.description, movie.imdb, movie.director, movie.actors, movie.duration, movie.start_date, movie.genre, movie.rating, movie.projections, movie.id);
        });
    }

    save(){
        if(this.id){
            return db.movie.update({
                where: {
                    id: this.id,
                }, data: {
                    title: this.title,
                    poster: this.poster,
                    description: this.description,
                    imdb: this.imdb,
                    director: this.director,
                    actors: this.actors,
                    duration: this.duration,
                    start_date: this.start_date,
                    genre: {
                        connect: {
                            id: this.genre,
                    }
                    },
                    rating: {
                        connect: {
                            id: this.rating,
                    }
                    //this.projections,
                }
         } });
        }else {
            return db.movie.create({
                data: {
                    title: this.title,
                    poster: this.poster,
                    description: this.description,
                    imdb: this.imdb,
                    director: this.director,
                    actors: this.actors,
                    duration: this.duration,
                    start_date: this.start_date,
                    genre: {
                        connect: {
                            id: this.genre,
                    }
                    },
                    rating: {
                        connect: {
                            id: this.rating,
                    }
                    //this.projections, // foreign key!!
                }
        }});
        }
    }

    static async delete(id){
        if(!id){
            throw new Error('Trying to delete a non-existent item');
        }else {
            return db.movie.delete({
                where: {
                    id: id,
                }
            });
        }
    }

    static async find(id){
        if(!id){
            throw new Error('Trying to find a non-existent item');
        }else {
            return db.movie.findFirst({
                where: {
                    id: this.id,
                }
            });
        }
    }
}

module.exports = Movie;
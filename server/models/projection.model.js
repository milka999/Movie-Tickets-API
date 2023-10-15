const db  = require('../util/db.server');

// OBRATI PAŽNJU NA FOREIGN KEYS - hint: createOrConnect!!!

class Projection {
    constructor(movie, room, time, available_seats, id){
        this.movie = movie,
        this.room = room,
        this.time =  time,
        this.available_seats = available_seats,
        //this.tickets = tickets, //ovo možda ne treba uopšte
        this.id = id
    }

    static async getAllProjections(){
        const projections = await db.projection.findMany();
        return projections.map((projection) => {
            return new Projection(projection.movie, projection.room, projection.time, projection.available_seats, /*tickets,*/ projection.id);
        });
    }

    save(){
        if(this.id){
            return db.projection.update({
                where: {
                    id: this.id,
                }, data: {
                    movie: {
                        connect: {
                            id: this.movie, 
                    }
                    },
                    room: {
                        connect: {
                            id: this.room,
                    }},
                    time: this.time,
                    available_seats: this.available_seats,
                }
            });
        }else {
            /* const available_seats = db.room.findFirst({
                where: {
                    id: this.room
                }
            }).seats; */
            return db.projection.create({
                data: {
                    movie: {
                        connect: {
                            id: this.movie, 
                    }
                    },
                    room: {
                        connect: {
                            id: this.room,
                    }},
                    time: this.time,
                    available_seats: this.available_seats,
                    //tickets: this.tickets,
                }
            })
        }
    }

    static async delete(id) {
        if(!id){
            throw new Error('Trying to delete a non-existent item');
        }else {
            return db.projection.delete({
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
            return db.projection.findFirst({
                where: {
                    id: this.id,
                }
            });
        }
    }
}

module.exports = Projection;
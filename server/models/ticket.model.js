const db  = require('../util/db.server');

//DODAJ FILTER
//Trebalo bi da postoji i seat
//Šta se dešava kad neko kupi kartu?

class Ticket {
    constructor(projection, user, price, id){
        this.projection = projection,
        this.user = user,
        this.price = price,
        this.id = id
    }

    static async getAllTickets(){ //ovo je vrv nepotrebno odje
        const tickets = await db.ticket.findMany();
        return tickets.map((ticket) => {
            return new Ticket(ticket.projection, ticket.user, ticket.price, ticket.id);
        });
    }

    static async find(id) {
        if(!id){
            throw new Error('Trying to find a non-existent item');
        }else {
            return db.ticket.findFirst({
                where: {
                    id: this.id,
                }
            });
        }
    }

    save(){
        if(this.id){
            return db.ticket.update({
                where: {
                    id: this.id,
                }, data: {
                    projection: {
                        connect: {
                            id: this.projection,
                    }
                    },
                    user: {
                        connect: {
                            id: this.user
                    }
                    },
                    price: this.price,
                }
            });
        }else {
            return db.movie.create({
                data: {
                    projection: {
                        connect: {
                            id: this.projection,
                    }
                    },
                    user: {
                        connect: {
                            id: this.user
                    }
                    },
                    price: this.price,
                }
            });
        }
    }

    static async delete(id){
        if(!id){
            throw new Error('Trying to delete a non-existent item');
        }else {
            return db.ticket.delete({
                where: {
                    id: this.id,
                }
            });
        }
    }
}

module.exports = Ticket;
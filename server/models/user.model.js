const db  = require('../util/db.server');

class User {
    constructor(name, email, password, role, id){
        this.name = name,
        this.email = email,
        this.password = password,
        this.role = role,
        this.id = id
    }

    static async getAllUsers(){
        const users = await db.user.findMany();
        return users.map((user) => {
            return new User(user.name, user.email, user.password, user.role, user.id);
        });
    }

    save(){
        if(this.id){
            return db.user.update({
                where: {
                    id: this.id,
                }, data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                }
            });
        }else {
            return db.user.create({
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                }
            });
        }
    }

    static async delete(id){
        if(!id){
            throw new Error('Trying to delete a non-existent item');
        }else {
            return db.user.delete({
                where: {
                    id: this.id,
                }
            });
        }
    }

    static async find(id){
        if(!id){
            throw new Error('Trying to find a non-existent item');
        }else {
            return db.user.findUnique({
                where: {
                    id: this.id,
                }
            });
        }
    }

    static async findEmail(email){
        if(!email){
            throw new Error('Trying to find a non-existent item');
        }else {
            return db.user.findFirst({
                where: {
                   email: email,
                }
            });
        }
    }

    
}

module.exports = User;
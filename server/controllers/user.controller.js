const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function findUserByEmail(req, res, next) {
    const email = req.body.email;
    let user;
    try{
        user = await User.findEmail(email);
    }catch(error) {
        return next(error);
    }

    res.json({user: user});
  }
  
 async  function createUser(req, res, next) {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 8);
    const name = req.body.name;
    const user = new User(name, email, password);
    try {
        await user.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Added new user', user: user});
  }
  
  async function findUserById(req, res, next) {
    const id = parseInt(req.params.id.split(':')[1]);
    let user;
    try{
        user = await user.find(id);
    }catch(error) {
        return next(error);
    }

    res.json({user: user});
  }

  async function updateUser(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const id = parseInt(req.params.id.split(':')[1]);
    const user = new User(name, email, password, id);
    try {
        await user.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Updated user', user: user});
  }
  
  module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
  };
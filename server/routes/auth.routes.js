const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const express = require('express');
const { isAuthenticated } = require('../middleware/auth.middleware');

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/logout', authController.deleteRefreshToken);
authRouter.get('/profile/:id', userController.findUserById);

module.exports = authRouter;

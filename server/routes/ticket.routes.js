const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controllers/ticket.controller');

ticketRouter.get('/', ticketController.getTickets);

ticketRouter.get('/:id', ticketController.getTicket);

ticketRouter.post('/', ticketController.addTicket);

ticketRouter.patch('/update/:id', ticketController.updateTicket);

ticketRouter.delete('/delete/:id', ticketController.deleteTicket);

module.exports = ticketRouter;
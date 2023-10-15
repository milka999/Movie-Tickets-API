const Ticket = require('../models/ticket.model');

async function getTickets(req, res, next){
    let tickets;
    try{
        tickets = await Ticket.getAlltickets();
    }catch(error){
        return next(error);
    }

    res.json({tickets: tickets,});
}

async function getTicket(req, res, next) {
    const ticketId = parseInt(req.params.id.split(':')[1]);
    let ticket;
    try{
        ticket = await Ticket.find(id);
    }catch(error) {
        return next(error);
    }

    res.json({ticket: ticket});
}

async function addTicket(req, res, next){
    const projection = parseInt(req.body.projection);
    const user = parseInt(req.body.user);
    const price = parseFloat(req.body.price);
    const ticket = new Ticket(projection, user, price);
    try {
        await ticket.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Added new ticket', ticket: ticket});
}

async function updateTicket(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    const projection = parseInt(req.body.projection);
    const user = parseInt(req.body.user);
    const price = parseFloat(req.body.price);
    const ticket = new Ticket(projection, user, price, id);
    try {
        await ticket.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Updated ticket', ticket: ticket});
}

async function deleteTicket(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    //const ticket  = new Ticket(null, id);
    try{
        await Ticket.delete(id);
    }catch(error) {
        return next(error);
    }

    res.json({message: 'ticket deleted'});
}

module.exports = {
    getTickets: getTickets,
    getTicket: getTicket,
    addTicket: addTicket,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket
}
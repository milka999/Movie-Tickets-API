const Projection = require('../models/projection.model');

async function getProjections(req, res, next){
    let projections;
    try{
        projections = await Projection.getAllProjections();
    }catch(error){
        return next(error);
    }

    res.json({projections: projections,});
}

async function getProjection(req, res, next) {
    const projectionId = parseInt(req.params.id.split(':')[1]);
    let projection;
    try{
        projection = await Projection.find(projectionId);
    }catch(error) {
        return next(error);
    }

    res.json({projection: projection});
}

async function addProjection(req, res, next){
    const movie = parseInt(req.body.movie);
    const room = parseInt(req.body.room);
    const time = (new Date(req.body.time)).toISOString();;
    const available_seats = parseInt(req.body.available_seats);
    const projection = new Projection(movie, room, time, available_seats);
    try {
        await projection.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Added new Projection', projection: projection});
}

async function updateProjection(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    const movie = parseInt(req.body.movie);
    const room = parseInt(req.body.room);
    const time = (new Date(req.body.time)).toISOString();
    const available_seats = parseInt(req.body.available_seats);
    const projection = new Projection(movie, room, time, available_seats, id);
    try {
        await projection.save();
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Updated Projection', Projection: Projection});
}

async function deleteProjection(req, res, next){
    const id = parseInt(req.params.id.split(':')[1]);
    //const projection  = new projection(null, id);
    try{
        await Projection.delete(id);
    }catch(error) {
        return next(error);
    }

    res.json({message: 'Projection deleted'});
}

module.exports = {
    getProjections: getProjections,
    getProjection: getProjection,
    addProjection: addProjection,
    updateProjection: updateProjection,
    deleteProjection: deleteProjection
}
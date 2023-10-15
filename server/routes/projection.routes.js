const express = require('express');
const projectionRouter = express.Router();
const projectionController = require('../controllers/projection.controller');

projectionRouter.get('/', projectionController.getProjections);

projectionRouter.get('/:id', projectionController.getProjection);

projectionRouter.post('/', projectionController.addProjection);

projectionRouter.patch('/:id', projectionController.updateProjection);

projectionRouter.delete('/:id', projectionController.deleteProjection);

module.exports = projectionRouter;
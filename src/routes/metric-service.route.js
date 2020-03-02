const express = require('express');
const metricServiceRouter = express.Router();

const { metricService } = require('../route-handler');
const { validator } = require('../validator');
const { metricValueSchema, paramsValueSchema } = require('../validator/joi-schemas');
const { requestConstants } = require('../constants');

// CREATE ROUTE
metricServiceRouter.post('/:key', validator(metricValueSchema, requestConstants.BODY), metricService.create);

// GET ROUTE
metricServiceRouter.get('/:key', validator(paramsValueSchema, requestConstants.PARAMS), metricService.all);
metricServiceRouter.get('/:key/sum', validator(paramsValueSchema, requestConstants.PARAMS), metricService.get);

module.exports = metricServiceRouter;
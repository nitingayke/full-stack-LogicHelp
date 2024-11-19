const express = require('express');
const Router = express.Router();
const listingController = require("../RouteControllers/ContestController.js");
const wrapAsync = require('../UtilErrors/errorHandling.js');

Router.get('/past-contests', wrapAsync(listingController.pastContest));

Router.get('/virtual-contest/:id', wrapAsync(listingController.vertualContestQuestions))

module.exports = Router;
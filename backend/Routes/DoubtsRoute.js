const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const Router = express.Router();
const listingController = require('../RouteControllers/DoubtController.js');

Router.get('/all-doubts', wrapAsync(listingController.getAllDoubts));

Router.get('/live-stream-message', wrapAsync(listingController.getTotalStreamMessage));

Router.get('/all-challenges', wrapAsync(listingController.getAllChallenges));

module.exports = Router;
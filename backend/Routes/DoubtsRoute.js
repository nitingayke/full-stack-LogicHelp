const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const Router = express.Router();
const listingController = require('../RouteControllers/DoubtController.js');

Router.put("/new-doubts/:id", wrapAsync(listingController.newDoubts));

Router.get('/all-doubts', wrapAsync(listingController.getAllDoubts));

Router.put('/doubt-comment/:doubt_id/user/:user_id', wrapAsync(listingController.addDoubtComment));

module.exports = Router;
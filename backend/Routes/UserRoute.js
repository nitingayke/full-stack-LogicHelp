const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const Router = express.Router();
const listingController = require('../RouteControllers/UserController.js');

Router.put('/update-profile/:id', wrapAsync(listingController.editProfile));





module.exports = Router;
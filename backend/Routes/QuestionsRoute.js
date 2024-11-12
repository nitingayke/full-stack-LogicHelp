const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const listingController = require("../RoutesControllers/QuestionsController");
const router = express.Router();

router.get("/total-questions", wrapAsync(listingController.questions));

router.post("/question-comments/:id", wrapAsync(listingController.addComments));

module.exports = router;
const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const listingController = require("../RouteControllers/QuestionsController");
const router = express.Router();

router.get("/total-questions", wrapAsync(listingController.questions));

router.get("/get-question/:id", wrapAsync(listingController.getQuestion));

router.put("/submit-code/:problem_id/user/:user_id/language/:code_language", wrapAsync(listingController.submitQuestion));

router.put("/question-like/:question_id/user/:user_id", wrapAsync(listingController.questionLike));

router.put("/comment/:question_id/user/:user_id", wrapAsync(listingController.addComments));

router.put("/comment/support-point/:comment_id/user/:user_id", wrapAsync(listingController.addSupportPoint))

router.delete('/:problem_id/delete-comment/:comment_id/user/:user_id', wrapAsync(listingController.deleteComment))

router.put('/add-favorite/:problem_id/user/:user_id', wrapAsync(listingController.addFavoriteQuestion));

module.exports = router;
const express = require("express");
const router = express.Router();
const wrapAsync = require("../UtilErrors/errorHandling");
const execute = require("../RouteControllers/ExecutionController");

router.post("/execute-code", wrapAsync(execute.codeExecution));

router.post("/youtube-video", wrapAsync(execute.youtubeVideo));

router.post('/execute-user-bug', wrapAsync(execute.executeUserBug));

router.post('/find-posted-jobs', wrapAsync(execute.postedIT_Jobs));

router.get('/total-courses', wrapAsync(execute.studyCourses));

module.exports = router;

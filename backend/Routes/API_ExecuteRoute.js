const express = require("express");
const router = express.Router();
const wrapAsync = require("../UtilErrors/errorHandling");
const execute = require("../RouteControllers/ExecutionController");

router.post("/execute-code", wrapAsync(execute.codeExecution));

router.post("/youtube-video", wrapAsync(execute.youtubeVideo));

module.exports = router;

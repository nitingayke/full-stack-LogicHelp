const { userVerification } = require("../Middlewares/AuthMiddleware.js");
const { Signup, Login } = require("../RoutesControllers/AuthController.js");
const wrapAsync = require("../UtilErrors/errorHandling.js");
const router = require("express").Router();

router.post("/signup", wrapAsync(Signup));

router.post('/login', wrapAsync(Login))

router.post('/', userVerification);

module.exports = router;
const express = require("express");
const wrapAsync = require("../UtilErrors/errorHandling");
const Router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const listingController = require('../RouteControllers/UserController.js');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'loginhelp_user_profiles',
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});
const upload = multer({ storage });

Router.post('/upload/profile-image/:id', upload.single('userImage'), wrapAsync(listingController.userProfileUpload));

Router.put('/update-profile/:id', wrapAsync(listingController.editProfile));

Router.get('/get-user/:id', wrapAsync(listingController.getUserById));

Router.post('/feedback/:id', wrapAsync(listingController.userFeedback));

Router.get("/total-feedback", wrapAsync(listingController.getTotalFeedbacks));

module.exports = Router;
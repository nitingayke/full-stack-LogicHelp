const User = require("../Models/UserModel.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { createSecretToken } = require("../UtilErrors/SecretToken.js");

module.exports.Signup = async (req, res, next) => {

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword, username });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        message: "User signed in successfully",
        success: true,
        user
    });
}

module.exports.Login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({  success: false, message: 'All fields are required' })
    }

    const user = await User.findOne({ email })
        .populate({
            path: "userProgress.submissions.questions",
            model: "Question",
        })
        .populate({
            path: "userProgress.contestStatus.contestQuestions",
            model: "Question",
        })
        .populate({
            path: "userProgress.favoriteQuestion",
            model: "Question",
        });

    if (!user) {
        return res.json({ success: false, message: 'Incorrect password or email' })
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        return res.json({ success: false, message: 'Incorrect password or email' })
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user
    });
}

module.exports.Logout = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "No token found, user is not logged in",
            success: false,
        });
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
    });

    return res.status(200).json({
        message: "User logged out successfully",
        success: true,
    });
}
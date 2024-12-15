const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel.js");
require("dotenv").config();

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: "Invalid token" });
        }

        const user = await User.findById(decoded.id)
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
            return res.status(404).json({ status: false, message: "User not found" });
        }

        req.user = user;
        return res.status(200).json({ status: true, user });
    });
}
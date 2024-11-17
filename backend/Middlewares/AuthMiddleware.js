const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.json({ status: false })
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
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
    
            if (user) {
                req.user = user;
                return res.json({ status: true, user: user })
            } else {
                return res.json({ status: false })
            }
        }
    })
}
const User = require("../Models/UserModel");
const Feedback = require("../Models/Feedback");

module.exports.editProfile = async (req, res) => {
    const { id } = req.params;
    const { fullName, about, linkedin, github, portfolio } = req.body.userData;

    const currUser = await User.findById(id);

    if (!currUser) {
        return res.status(404).json({ success: false, message: "user not found" });
    }
    if (!fullName || !about) {
        return res.status(400).json({ success: false, message: 'name and about are required.' });
    }

    currUser.name = fullName;
    currUser.about = about,
        currUser.socialLink = { linkedIn: linkedin, github: github, portFolio: portfolio };

    await currUser.save();

    return res.status(200).json({ success: true, message: 'user profile updated successfully' });
}

module.exports.getUserById = async (req, res) => {
    const { id } = req.params;

    const currUser = await User.findById(id)
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

    return res.json({ success: true, user: currUser });
}

module.exports.userProfileUpload = async (req, res) => {
    const { id } = req.params;

    const currUser = await User.findById(id);

    if (!req.file) {
        return res.status(400).json({ success: false, error: 'File upload failed. Please try again.' });
    }
    
    if(!currUser)
        return res.status(404).json({ success: false, error: 'User not found' });

    const fileUrl = req.file.path;
    currUser.image = fileUrl;
    await currUser.save();

    return res.status(200).json({ success: true, message: 'Profile image uploaded successfully', url: fileUrl });
}

module.exports.userFeedback = async(req, res) => {
    
    const { id } = req.params;
    const { rating, reviewMessage, working } = req.body;

    if (!id || !reviewMessage || !working || !rating) {
        return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    if (reviewMessage.length > 250 || working.length > 50) {
        return res.status(400).json({ success: false, message: "Your message or profession is too long." });
    }

    const newFeedback = new Feedback({
        user: id,
        rating,
        reviewMessage,
        working,
    });

    await newFeedback.save();
    return res.status(200).json({ success: true, message: "Feedback submitted successfully" });
}

module.exports.getTotalFeedbacks = async(req, res) => {
    const feedbacks = await Feedback.find({});
    return res.status(200).json({ success: true, feedbacks });
}

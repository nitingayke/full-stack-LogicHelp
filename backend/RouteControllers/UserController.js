const User = require("../Models/UserModel");

module.exports.editProfile = async (req, res) => {
    const { id } = req.params;
    const { fullName, about, linkedin, github, portfolio } = req.body.userData;

    const currUser = await User.findById(id);

    if (!currUser) {
        return res.status(404).json({ message: "user not found" });
    }
    if (!fullName || !about) {
        return res.status(400).json({ message: 'name and about are required.' });
    }

    currUser.name = fullName;
    currUser.about = about,
        currUser.socialLink = { linkedIn: linkedin, github: github, portFolio: portfolio };

    await currUser.save();

    return res.status(200).json({ message: 'user profile updated successfully' });
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

    return res.json({ user: currUser });
}

module.exports.userProfileUpload = async (req, res) => {
    const { id } = req.params;

    const currUser = await User.findById(id);

    if (!req.file) {
        return res.status(400).json({ error: 'File upload failed. Please try again.' });
    }
    
    if(!currUser)
        return res.status(404).json({ error: 'User not found' });

    const fileUrl = req.file.path;
    currUser.image = fileUrl;
    await currUser.save();

    return res.status(200).json({ message: 'Profile image uploaded successfully', url: fileUrl });
}
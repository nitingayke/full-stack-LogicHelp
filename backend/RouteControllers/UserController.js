const User = require("../Models/UserModel");

module.exports.editProfile = async(req, res) => {
    const { id } = req.params;
    const { fullName, about, linkedin, github, portfolio } = req.body.userData;

    const currUser = await User.findById(id);

    if(!currUser){
        return res.status(404).json({message: "user not found"});
    }
    if(!fullName || !about){
        return res.status(400).json({message: 'name and about are required.'});
    }

    currUser.name = fullName;
    currUser.about = about,
    currUser.socialLink = {linkedIn: linkedin, github: github, portFolio: portfolio};

    await currUser.save();

    return res.status(200).json({message: 'user profile updated successfully'});
}
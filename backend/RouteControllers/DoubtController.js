const Doubt = require("../Models/DoubtModel");
const User = require("../Models/UserModel");

module.exports.newDoubts = async (req, res) => {
    const { id } = req.params;
    const { title, message: doubtMessage, tag } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (!title || !doubtMessage || !tag) {
        return res.status(400).json({ message: "Title, message, and tag are required." });
    }

    const newDoubt = new Doubt({
        user: id,
        title,
        message: doubtMessage,
        tag,
    });

    await newDoubt.save();
    return res.status(200).json({ message: "Doubt successfully submitted!" });
}

module.exports.getAllDoubts = async (req, res) => {

    const totalDoubts = await Doubt.find({})
        .populate({
            path: 'user',
            select: 'username _id country', 
        });

    return res.status(200).json({
        message: "Doubts fetched successfully.",
        allDoubts: totalDoubts,
    });
}

module.exports.addDoubtComment = async (req, res) => {
    const { doubt_id, user_id } = req.params;
    const { reply: replyMessage } = req.body;

    if(!doubt_id || !user_id || !replyMessage){
        return res.status(400).json({message: 'doubt id and user id missing.'});
    }

    const currUser = await User.findById(user_id);
    const currDoubt = await Doubt.findById(doubt_id);

    if(!currUser || !currDoubt){
        return res.json(404).json({});
    }

    currDoubt.comments.push({
        user: user_id,
        message: replyMessage,
    });
    await currDoubt.save();

    return res.status(200).json({message: ''});
}
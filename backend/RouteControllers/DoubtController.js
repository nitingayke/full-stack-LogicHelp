const Doubt = require("../Models/DoubtModel");
const LiveStream = require("../Models/LiveStream");
const LiveChallenge = require('../Models/LiveChallenge.js');
const User = require("../Models/UserModel");

module.exports.getAllDoubts = async (req, res) => {

    const totalDoubts = await Doubt.find({})
        .sort({ createdAt: -1 }) // Sort by `createdAt` field in descending order
        .populate({
            path: 'user',
            select: 'username _id country image',
        })
        .populate({
            path: 'comments.user',
            select: 'username _id country image',
        });

    return res.status(200).json({
        message: "Doubts fetched successfully.",
        allDoubts: totalDoubts,
    });
}

module.exports.getTotalStreamMessage = async (req, res) => {

    const totalStreamMessage = await LiveStream.find({})
        .sort({ createdAt: -1 })
        .populate({
            path: 'user',
            select: 'username _id country image',
        });

    return res.status(200).json({ streamMessage: totalStreamMessage });
}

module.exports.getAllChallenges = async (req, res) => {

    const totalChallenges = await LiveChallenge.find({})
        .sort({ createdAt: -1 })
        .populate({
            path: 'user',
            select: 'username _id country image'
        })
        .populate({
            path: 'result.user',
            select: 'username _id country image'

        });

    return res.status(200).json({ totalChallenges });
}
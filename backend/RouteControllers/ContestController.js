const PastContest = require("../Models/PastContest")

module.exports.pastContest = async (req, res) => {

    const allContest = await PastContest.find({});

    return res.status(200).json({ allContest });
}

module.exports.vertualContestQuestions = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({  success: false, error: 'Contest ID is required.' });
    }

    const contestQuestions = await PastContest.findById(id)
        .populate({
            path: 'questions',
            select: '_id title category',
        })
        .populate({
            path: 'participatedUser',
            select: '_id username image userProgress.contestStatus',
        });

    return res.status(200).json({ contestQuestions });
}
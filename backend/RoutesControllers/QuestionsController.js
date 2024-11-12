const Question = require("../Models/Questions")

module.exports.questions = async(req, res, next) => {
    const totalQuestions = await Question.find({});
    return res.json(totalQuestions);
}

module.exports.addComments = async(req, res, next) => {
    const { id } = req.params;
    
    return res.json({message: "well come to comment section", questionId: id});
};
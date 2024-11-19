const Question = require("../Models/Questions");
const User = require("../Models/UserModel");
const Comment = require("../Models/Comments");
const mongoose = require('mongoose');

module.exports.questions = async (req, res) => {
    const totalQuestions = await Question.find({});
    return res.json(totalQuestions);
}

module.exports.addComments = async (req, res) => {
    const { question_id, user_id } = req.params;
    const { comment: userComment } = req.body;

    if (!userComment) {
        return res.status(400).json({ message: "Comment content is required." });
    }

    const question = await Question.findById(question_id);
    const user = await User.findById(user_id);

    if (!question || !user) {
        return res.status(404).json({ message: "Question or User not found." });
    }

    const newComment = new Comment({
        user: user_id,
        content: userComment,
    });

    const commentRes = await newComment.save();

    question.comments.push(commentRes._id);
    await question.save();

    return res.status(200).json({});
};

module.exports.getQuestion = async (req, res) => {
    const { id } = req.params;

    const question = await Question.findOne({ _id: id })
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username _id image country'
            }
        });
        
    return res.json(question);
}

module.exports.submitQuestion = async (req, res) => {

    const { problem_id, user_id, code_language } = req.params;

    const question = await Question.findById(problem_id);
    const user = await User.findById(user_id);

    if (!question || !user) {
        return res.status(404).json({ success: false, message: "Data not found" });
    }

    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todaysSubmission = user.userProgress.submissions.find(submission =>
        submission.date.getTime() === todayDate.getTime()
    );

    if (todaysSubmission) {
        if (!todaysSubmission.questions.includes(problem_id)) {
            todaysSubmission.questions.push(problem_id);
            user.userProgress.coins += 1;
        }
    } else {
        user.userProgress.submissions.push({
            date: todayDate,
            questions: [problem_id],
        });
        user.userProgress.activeDay += 1;
        user.userProgress.coins += 1;
    }

    const languageIndex = user.userProgress.languages.findIndex(lang => lang.language === code_language);
    if (languageIndex === -1) {
        user.userProgress.languages.push({ language: code_language, number: [problem_id.toString()] });
    } else if (!user.userProgress.languages[languageIndex].number.includes(problem_id.toString())) {
        user.userProgress.languages[languageIndex].number.push(problem_id.toString());
    }

    question.topics.forEach(topic => {
        if (!user.userProgress.skills.includes(topic)) {
            user.userProgress.skills.push(topic);
        }
    });

    if (!question.accepted.includes(user_id)) {
        question.accepted.push(user_id);
    }

    await user.save();
    await question.save();

    return res.status(200).json({
        success: true,
        message: "Question submission successful",
    });
}

module.exports.questionLike = async (req, res) => {
    const { question_id, user_id } = req.params;

    const question = await Question.findById(question_id);


    if (!question) {
        return res.status(404).json({ message: "Question not found" })
    }

    question.likes.push(user_id);
    await question.save();

    return res.status(200).json({ message: "Question liked successfully" });
}

module.exports.addSupportPoint = async (req, res) => {

    const { comment_id, user_id } = req.params;

    const currComment = await Comment.findById(comment_id);
    const loginUser = await User.findById(user_id);

    if (!comment_id || !user_id)
        return res.status(400).json({ success: false, message: 'Comment ID and User ID are required.' });


    if (!currComment || !loginUser)
        return res.status(404).json({ success: false, message: 'Comment or User not found.' });


    currComment.supportPoints.push(user_id);
    loginUser.userProgress.supportPoints += 1;

    await currComment.save();
    await loginUser.save();

    return res.status(200).json({ success: true, message: 'Support point added successfully.' });
}

module.exports.deleteComment = async (req, res) => {
    const { problem_id, comment_id, user_id } = req.params;

    if (!problem_id || !comment_id || !user_id) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    const currComment = await Comment.findById(comment_id);
    const currQuestion = await Question.findById(problem_id);

    if (!currComment || !currQuestion) {
        return res.status(404).json({ message: "Comment or Question not found" });
    }

    const isCommentInQuestion = currQuestion.comments.includes(comment_id);
    if (!isCommentInQuestion) {
        return res.status(400).json({ message: "Comment does not belong to the specified question" });
    }

    await Comment.findByIdAndDelete(comment_id);

    currQuestion.comments = currQuestion.comments.filter(
        (q) => q.toString() !== comment_id
    );
    await currQuestion.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
}

module.exports.addFavoriteQuestion = async (req, res) => {
    const { problem_id, user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(problem_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid problem or user ID." });
    }

    const currProblem = await Question.findById(problem_id);
    const currUser = await User.findById(user_id);

    if (!currProblem || !currUser) {
        return res.status(404).json({ message: "Problem or user not found." });
    }

    if (currUser.userProgress.favoriteQuestion.includes(problem_id)) {
        return res.status(200).json({ message: "Problem already in favorites." });
    }

    currUser.userProgress.favoriteQuestion.push(problem_id);
    await currUser.save();

    return res.status(200).json({ message: "Problem added to favorites successfully." });
}
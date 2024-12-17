const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNo: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    likes: [{ type: String }],
    image: { type: String },
    description: [{ type: String, required: true }],
    examples: [{
        input: { type: String, required: true },
        output: { type: String },
        description: { type: String },
        image: { type: String },
        _id: false 
    }],
    category: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    topics: [{ type: String }],
    hint: [{ type: String }],
    constraints: [{ type: String }],
    followUp: [{ type: String }],
    company: [{type: String}],
    accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

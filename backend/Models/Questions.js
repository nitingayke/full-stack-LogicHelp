const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNo: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String },
    description: [{ type: String, required: true }],
    examples: [{
        input: { type: String, required: true },
        output: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        _id: false 
    }],
    category: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    topics: [{ type: String }],
    acceptance: { type: Number, min: 0 },
    hint: [{ type: String }],
    constraints: [{ type: String }],
    followUp: [{ type: String }],
    company: [{type: String}],
    Accepted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

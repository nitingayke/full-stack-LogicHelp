const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
    contestNo: { 
        type: Number, 
        required: true 
    },
    questions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true 
    }],
    date: { 
        type: Date, 
        required: true 
    },
    participatedUser: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
});

module.exports = mongoose.model('PastContests', ContestSchema);

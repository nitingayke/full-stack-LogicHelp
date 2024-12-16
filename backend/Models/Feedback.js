const mongoose = require("mongoose");
const { Schema } = mongoose;

const userFeedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    rating: {
        type: Number,
        default: 1,
    },
    reviewMessage: {
        type: String,
        required: true, 
    },
    working: {
        type: String,
    }
});

const Feedback = mongoose.model("Feedback", userFeedbackSchema);
module.exports = Feedback;

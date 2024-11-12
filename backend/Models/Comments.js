const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    supportPoints: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model("Comment", commentSchema);

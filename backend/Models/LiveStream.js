const mongoose = require("mongoose");

const liveStreamSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    message: {
        type: String
    }
}, {
    timestamps: true,
});

const LiveStream = mongoose.model("LiveStream", liveStreamSchema);
module.exports = LiveStream;
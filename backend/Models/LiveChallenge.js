const mongoose = require('mongoose');
const { Schema } = mongoose;

const liveChallengeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    textMessage: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
    result: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: {
                type: String,
                required: true
            },
            deployLink: {
                type: String,
            },
            createdAt: {
                type: Date
            }
        }
    ]
}, { timestamps: true });

const LiveChallenge = mongoose.model('LiveChallenge', liveChallengeSchema);

module.exports = LiveChallenge;

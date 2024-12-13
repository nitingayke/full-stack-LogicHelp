const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    video: {
        videoId: { type: String },
    },
    snippet: {
        title: { type: String },
        description: { type: String, required: true },
        publishedAt: { type: Date, required: true },
        thumbnails: {
            medium: {
                url: { type: String, required: true },
            },
        },
    },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
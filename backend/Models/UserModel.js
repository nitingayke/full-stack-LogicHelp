const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  image: {
    type: String,
  },
  rank: {
    type: Number,
  },
  country: {
    type: String,
  },
  socialLink: {
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
    portFolio: {
      type: String,
    },
  },
  userProfress: {
    supportPoints: {
      type: Number,
      default: 0,
    },
    languages: {
      type: [String], // Array of strings for languages
    },
    skills: {
      type: [String], // Array of strings for skills
    },
    favoriteQuestion: {
      type: [mongoose.Schema.Types.ObjectId], // Assuming these are references to other documents (e.g., Question model)
      ref: "Question",
    },
    contestStatus: [
      {
        contest: {
          type: Number,
        },
        date: {
          type: Date,
        },
        contestQuestions: [
          {
            type: mongoose.Schema.Types.ObjectId, // Reference to questions
            ref: "Question",
          },
        ],
        rank: {
          type: Number,
        },
        score: {
          type: Number,
        },
        timeTaken: {
          type: String,
        },
      },
    ],
    activeDay: {
      type: Number,
    },
    totalStreak: {
      type: Number,
    },
    submissions: [
      {
        date: {
          type: Date,
        },
        questions: [
          {
            type: mongoose.Schema.Types.ObjectId, // Reference to questions
            ref: "Question",
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
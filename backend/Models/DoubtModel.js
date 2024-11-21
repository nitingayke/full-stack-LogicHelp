const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tag: { 
        type: String, 
        required: true 
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isSolve: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        createdAt: { type: Date }
      },
    ],
  },
  { timestamps: true }
);

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = Doubt;

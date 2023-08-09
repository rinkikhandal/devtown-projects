const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please enter the title"],
      maxLength: [20, "title should be atmost 20 chrs, got {VALUE}"],
    },
    content: {
      type: String,
      required: [true, "enter the post content"],
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    //user associated with every post

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

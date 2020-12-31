const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Posts", PostsSchema);

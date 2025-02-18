const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    default: "N/A",
  },

  imageUrl: {
    type: String,
    default: "N/A",
  },

  github: {
    type: String,
    default: "N/A",
  },
  demo: {
    type: String,
    default: "N/A",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

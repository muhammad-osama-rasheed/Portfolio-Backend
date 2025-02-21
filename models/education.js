const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  institute: {
    type: String,
    required: true,
    trim: true,
  },

  degree: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  imageUrl: {
    type: String,
  },

  startDate: {
    type: String,
    required: true,
  },

  endDate: {
    type: String,
    default: "Present",
  },
  
  isOngoing: {
    type: Boolean,
    default: false,
  },

  grade: {
    type: String,
    default: "N/A",
  },
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;

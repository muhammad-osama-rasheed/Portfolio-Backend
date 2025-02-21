const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  company: {
    type: String,
    required: true,
    trim: true,
  },

  issue_date: {
    type: String,
    default: "N/A",
  },

  image: {
    type: String,
  },

  imageUrl: {
    type: String,
  },

  url: {
    type: String,
    required: true,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;

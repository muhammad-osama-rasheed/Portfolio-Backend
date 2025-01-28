const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Skill",
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 50,
  },
  color: {
    type: String,
    required: true,
    default: "#2C98F0",
  },
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;

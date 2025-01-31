const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 25,
    default: "Skill",
  },

  category: {
    type: String,
    required: true,
    enum: ["frontend", "backend", "database", "language", "other"],
    trim: true,
  },

  image: {
    type: String,
    default:
      "https://drive.google.com/file/d/1vcrzoqojCCnDJfrbHu6g3qKLgd98hIho/view?usp=sharing",
  },
});

const Skills = mongoose.model("Skills", skillsSchema);
module.exports = Skills;

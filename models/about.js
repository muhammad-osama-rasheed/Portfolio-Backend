const mongoose = require("mongoose");

const aboutCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#2C98F0",
  },
});

const AboutCard = mongoose.model("AboutCard", aboutCardSchema);
module.exports = AboutCard;

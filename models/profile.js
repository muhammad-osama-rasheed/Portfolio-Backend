const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;

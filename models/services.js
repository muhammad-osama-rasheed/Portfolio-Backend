const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
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

  tech: {
    type: String,
    required: false,
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
    default: "#EC5453",
  },
});

const Service = mongoose.model("Service", servicesSchema);

module.exports = Service;

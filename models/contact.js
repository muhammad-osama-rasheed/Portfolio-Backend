const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match:
      /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com)$/,
  },

  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 300,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

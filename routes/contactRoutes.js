const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newContact = new Contact(data);

    const savedContact = await newContact.save();

    // Email Sending Logic
    const mailOptions = {
      from: process.env.EMAIL,
      to: savedContact.email,
      subject: "Thank you for contacting me!",
      text: `Hi ${savedContact.name},\n\nThank you for reaching out. I have received your message:\n\n"${savedContact.message}".\n\nI will get back to you soon.\n\nBest Regards,\nMuhammad Osama`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ error: "Error sending confirmation email." });
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      success: true,
      message:
        "Your details have been successfully recorded. Please check your email for a confirmation message.",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Contact.find();

    if (data.length === 0) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ success: false, error: "Data Not Found." });
    }

    res.status(200).json({
      success: true,
      message: "Information Updated Successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Contact.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({ success: false, error: "Data Not Found." });
    }

    res.status(200).json({
      success: true,
      message: "Information Deleted Successfully",
    });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;

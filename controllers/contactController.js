const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const createContact = async (req, res) => {
  try {
    const data = req.body;
    const newContact = new Contact(data);

    const savedContact = await newContact.save();

    // Email Sending Logic
    const mailOptions = {
      from: process.env.EMAIL,
      to: savedContact.email,
      subject: "Thank you for Reaching Out!",
      text: `Hi ${savedContact.name},\n\nThank you for getting in touch! I have received your message:\n\n"${savedContact.message}".\n\nI will get back to you soon.\n\nBest Regards,\nMuhammad Osama`,
    };

    // Send the email
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //     return res
    //       .status(500)
    //       .json({ error: "Error sending confirmation email." });
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    // sending mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Please check your email.",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const data = await Contact.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Contacts not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found." });
    }

    res.status(200).json({
      success: true,
      message: "Contact information updated.",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Contact.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found." });
    }

    res.status(200).json({
      success: true,
      message: "Contact information deleted.",
    });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};

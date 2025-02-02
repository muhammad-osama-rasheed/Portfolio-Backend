const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newContact = new Contact(data);

    const savedContact = await newContact.save();
    res.status(201).json({
      success: true,
      message: "Information saved successfully",
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

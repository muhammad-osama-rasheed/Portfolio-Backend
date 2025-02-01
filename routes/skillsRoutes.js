const express = require("express");
const router = express.Router();
const Skills = require("../models/skills");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    data.image = req.file ? req.file.buffer.toString("base64") : null;

    const newSkill = new Skills(data);

    const savedSkill = await newSkill.save();
    res.status(201).json({ success: true, data: savedSkill });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Skills.find();

    if (data.length === 0) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedSkill = await Skills.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSkill) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res.status(200).json({ success: true, data: updatedSkill });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Skills.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Data Deleted Successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Progress = require("../models/progress");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newProgress = new Progress(data);

    const savedProgress = await newProgress.save();
    res.status(201).json({ success: true, data: savedProgress });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Progress.find();

    if (data.length == 0) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedProgress = await Progress.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ error: "Data Not Found." });
    }

    res.status(200).json({ success: true, data: updatedProgress });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Progress.findByIdAndDelete(id);

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

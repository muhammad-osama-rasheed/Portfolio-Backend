const express = require("express");
const router = express.Router();
const Progress = require("../models/progress");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newProgress = new Progress(data);

    const savedProgress = await newProgress.save();
    console.log("DATA SAVED!");
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
      return res.status(404).json("Data Not Found.");
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;

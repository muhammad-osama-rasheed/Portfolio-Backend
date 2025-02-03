const express = require("express");
const router = express.Router();
const multer = require("multer");

const Profile = require("../models/profile");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Image Provided." });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    const newProfile = new Profile({ image: imageBase64 });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile Photo Uploaded Successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Profile.find();

    if (data.length === 0) {
      return res.status(404).json({ error: "Profile Photo Not Found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log("Error Saving: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.put("/:id", upload.single("newimage"), async (req, res) => {
  try {
    const id = req.params.id;

    if (req.file) {
      const imageBase64 = req.file.buffer.toString("base64");

      const updatedProfile = await Profile.findByIdAndUpdate(
        id,
        { image: imageBase64 },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile Not Found." });
      }

      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        data: updatedProfile,
      });
    } else {
      return res.status(400).json({ error: "No new image provided." });
    }
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ error: "Profile Not Found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile Photo Deleted Successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;

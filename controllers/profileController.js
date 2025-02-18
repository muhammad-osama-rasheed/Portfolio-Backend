const Profile = require("../models/profile");

const createProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: true, message: "No image Provided." });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    const newProfile = new Profile({ image: imageBase64 });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile Photo uploaded successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getProfile = async (req, res) => {
  try {
    const data = await Profile.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Profile Photo not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateProfile = async (req, res) => {
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
        return res
          .status(404)
          .json({ success: false, message: "Profile Photo not found." });
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        data: updatedProfile,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No new image provided." });
    }
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile Photo deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };

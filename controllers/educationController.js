const Education = require("../models/education");

const createEducation = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.buffer.toString("base64");
    }

    const newEducation = new Education(data);
    const savedEducation = await newEducation.save();

    res.status(201).json({
      success: true,
      message: "Education successfully added.",
      data: savedEducation,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllEducations = async (req, res) => {
  try {
    const data = await Education.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateEducation = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedEducation = await Education.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEducation) {
      return res
        .status(404)
        .json({ succes: false, message: "Education not found." });
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully.",
      data: updatedEducation,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Education.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found." });
    }
    res.status(200).json({
      success: true,
      message: "Education deleted successfully.",
    });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
};

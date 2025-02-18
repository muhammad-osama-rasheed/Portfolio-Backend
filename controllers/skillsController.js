const Skills = require("../models/skills");

const createSkill = async (req, res) => {
  try {
    const data = req.body;

    // console.log(req.file);
    // data.image = req.file ? req.file.path : null;

    data.image = req.file ? req.file.buffer.toString("base64") : null;

    const newSkill = new Skills(data);

    const savedSkill = await newSkill.save();
    res
      .status(201)
      .json({ success: true, message: "Your Skill added.", data: savedSkill });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllSkills = async (req, res) => {
  try {
    const data = await Skills.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Skills not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateSkill = async (req, res) => {
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
      return res
        .status(404)
        .json({ success: false, message: "Skills not found." });
    }

    res.status(200).json({
      success: true,
      message: "Your Skill Updated.",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Skills.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Skills not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Skill deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { createSkill, getAllSkills, updateSkill, deleteSkill };

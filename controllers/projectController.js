const Project = require("../models/project");

const createProject = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.buffer.toString("base64");
    }

    const newProject = new Project(data);
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project successfully added.",
      data: savedProject,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const data = await Project.find();

    if (data.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Project record not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedCertificate = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCertificate) {
      return res
        .status(404)
        .json({ success: false, message: "Project record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};

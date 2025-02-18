const Progress = require("../models/progress");

const createProgress = async (req, res) => {
  try {
    const data = req.body;
    const newProgress = new Progress(data);

    const savedProgress = await newProgress.save();
    res.status(201).json({
      success: true,
      message: "Progress bar created.",
      data: savedProgress,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllProgress = async (req, res) => {
  try {
    const data = await Progress.find();

    if (data.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Progress bar not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateProgress = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedProgress = await Progress.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProgress) {
      return res
        .status(404)
        .json({ success: false, message: "Progress bar not found." });
    }

    res.status(200).json({
      success: true,
      message: "Progress bar updated.",
      data: updatedProgress,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteProgress = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Progress.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Progress bar not found." });
    }

    res.status(200).json({ success: true, message: "Progress bar deleted." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createProgress,
  getAllProgress,
  updateProgress,
  deleteProgress,
};

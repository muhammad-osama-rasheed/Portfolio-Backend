const AboutCard = require("../models/about");

const createAboutCard = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.buffer.toString("base64");
    }

    const newAboutCard = new AboutCard(data);

    const savedAboutCard = await newAboutCard.save();
    res
      .status(201)
      .json({ success: true, message: "Card Saved!", data: savedAboutCard });
  } catch (error) {
    console.error("Error Creating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllAboutCards = async (req, res) => {
  try {
    const data = await AboutCard.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Card record not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateAboutCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedAboutCard = await AboutCard.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAboutCard) {
      return res
        .status(404)
        .json({ success: false, message: "Card record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Card updated successfully.",
      data: updatedAboutCard,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteAboutCard = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await AboutCard.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Card record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Card deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createAboutCard,
  getAllAboutCards,
  updateAboutCard,
  deleteAboutCard,
};

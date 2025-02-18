const Service = require("../models/services");

const createService = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.buffer.toString("base64");
    }

    const newService = new Service(data);
    const savedService = await newService.save();

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: savedService,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllServices = async (req, res) => {
  try {
    const data = await Service.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "service record not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res
        .status(404)
        .json({ success: false, message: "Service record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Service record updated successfully.",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Service.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Service record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Service record deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};

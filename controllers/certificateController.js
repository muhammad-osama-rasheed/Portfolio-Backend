const Certificate = require("../models/certificate");

const createCertificate = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.buffer.toString("base64");
    }

    const newCertificate = new Certificate(data);
    const savedCertificate = await newCertificate.save();

    res.status(201).json({
      success: true,
      message: "Certificate successfully added.",
      data: savedCertificate,
    });
  } catch (error) {
    console.error("Error Saving: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const data = await Certificate.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No certificate records found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCertificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found." });
    }

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully.",
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCertificate = await Certificate.findByIdAndDelete(id);

    if (!deletedCertificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Certificate deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  updateCertificate,
  deleteCertificate,
};

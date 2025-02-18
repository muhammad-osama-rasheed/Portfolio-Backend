const Blog = require("../models/blogs");

const createBlog = async (req, res) => {
  try {
    const data = req.body;

    const newBlog = new Blog(data);

    const savedBlog = await newBlog.save();
    res
      .status(201)
      .json({ success: true, message: "Blog Saved!", data: savedBlog });
  } catch (error) {
    console.error("Error Creating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog record not found." });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error Fetching: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog record not found." });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findByIdAndDelete(id);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Blog record not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error Deleting: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };

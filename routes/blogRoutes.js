const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const ensureAuthenticated = require("../middlewares/auth");

router.post("/", ensureAuthenticated, createBlog);

router.get("/", getAllBlogs);

router.put("/:id", ensureAuthenticated, updateBlog);

router.delete("/:id", ensureAuthenticated, deleteBlog);

module.exports = router;

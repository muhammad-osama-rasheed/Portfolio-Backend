const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createProject);

router.get("/", getAllProjects);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("new_image"),
  updateProject
);

router.delete("/:id", ensureAuthenticated, deleteProject);

module.exports = router;

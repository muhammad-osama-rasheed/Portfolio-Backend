const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createEducation);

router.get("/", getAllEducations);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("new_image"),
  updateEducation
);

router.delete("/:id", ensureAuthenticated, deleteEducation);

module.exports = router;

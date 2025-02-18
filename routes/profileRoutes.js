const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createProfile);

router.get("/", getProfile);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("newimage"),
  updateProfile
);

router.delete("/:id", ensureAuthenticated, deleteProfile);

module.exports = router;

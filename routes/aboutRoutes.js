const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createAboutCard,
  getAllAboutCards,
  updateAboutCard,
  deleteAboutCard,
} = require("../controllers/aboutController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createAboutCard);

router.get("/", getAllAboutCards);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("new_image"),
  updateAboutCard
);

router.delete("/:id", ensureAuthenticated, deleteAboutCard);

module.exports = router;

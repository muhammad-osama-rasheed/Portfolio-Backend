const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createService);

router.get("/", getAllServices);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("new_image"),
  updateService
);

router.delete("/:id", ensureAuthenticated, deleteService);

module.exports = router;

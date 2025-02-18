const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createCertificate,
  getAllCertificates,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");
const ensureAuthenticated = require("../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  createCertificate
);

router.get("/", getAllCertificates);

router.put(
  "/:id",
  ensureAuthenticated,
  upload.single("new_image"),
  updateCertificate
);

router.delete("/:id", ensureAuthenticated, deleteCertificate);

module.exports = router;

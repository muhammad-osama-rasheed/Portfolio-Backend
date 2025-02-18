const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillsController");
const ensureAuthenticated = require("../middlewares/auth");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const suffix = Date.now();
//     cb(null, suffix + "-" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", ensureAuthenticated, upload.single("image"), createSkill);

router.get("/", getAllSkills);

router.put("/:id", ensureAuthenticated, upload.single("newimage"), updateSkill);

router.delete("/:id", ensureAuthenticated, deleteSkill);

module.exports = router;

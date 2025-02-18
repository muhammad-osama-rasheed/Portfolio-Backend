const express = require("express");
const router = express.Router();

const {
  createProgress,
  getAllProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progresController");
const ensureAuthenticated = require("../middlewares/auth");

router.post("/", ensureAuthenticated, createProgress);

router.get("/", getAllProgress);

router.put("/:id", ensureAuthenticated, updateProgress);

router.delete("/:id", ensureAuthenticated, deleteProgress);

module.exports = router;

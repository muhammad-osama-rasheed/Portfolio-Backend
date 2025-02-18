const express = require("express");
const router = express.Router();

const ensureAuthenticated = require("../middlewares/auth");
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", createContact);

router.get("/", getAllContacts);

router.put("/:id", ensureAuthenticated, updateContact);

router.delete("/:id", ensureAuthenticated, deleteContact);

module.exports = router;

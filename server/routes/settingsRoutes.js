const express = require("express");
const router = express.Router();
const { updateProfile, deleteAccount } = require("../controller/settingsController");

router.put("/update", updateProfile);
router.delete("/delete", deleteAccount);

module.exports = router;
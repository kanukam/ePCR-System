const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /settings/ :
router.get("/:username", auth, controller.viewUser); // View user details

module.exports = router;

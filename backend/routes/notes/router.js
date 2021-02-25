const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /notes/ :
router.get("/", auth, controller.getAllNotes);

module.exports = router;

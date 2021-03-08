const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

//this will be prefixed with /notes/
router.get("/chart/:chartId", auth, controller.viewNotes);

router.post("/chart/:chartId/add", auth, controller.createNote);

module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /patients/ :
router.get("/", auth, controller.getAllPatients); // View all patients

router.post("/add", auth, controller.addPatient);

router.get("/:patientId", auth, controller.getPatient);

router.post("/:patientId/update", auth, controller.updatePatient);

router.get("/:patientId/charts", auth, controller.getPatientCharts);

router.get("/:patientId/charts/:chartId/notes", auth, controller.viewNotes);

router.post("/:patientId/charts/:chartId/notes/add", auth, controller.createNote);

//router.get("/:patientId/charts/:chartId/notes/:noteId", auth, controller.viewNote);

module.exports = router;

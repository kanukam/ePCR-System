// @ts-check
const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /charts/ :
router.get("/", auth, controller.viewAllCharts); // View all charts

router.get("/patients", auth, controller.viewAllPatientCharts);

router.post("/add", auth, controller.addChart);

router.get("/:chartId", auth, controller.viewChart);

router.post("/:chartId/update", auth, controller.updateChart);

router.get("/:chartId/pdf", auth, controller.downloadPdf);

router.get("/:chartId/pdfTest", controller.downloadPdfTest);

router.get("/patient/:chartId", auth, controller.viewPatientChart);

module.exports = router;
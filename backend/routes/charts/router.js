// @ts-check
const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /charts/ :
router.get("/", auth, controller.viewAllCharts); // View all charts

router.get("/patients", auth, controller.viewAllPatientCharts);

router.post("/add", auth, controller.addChart);

router.post("/summary", auth, controller.summary);

router.post("/calls", auth, controller.calls);

router.get("/:chartId", auth, controller.viewChart);

router.post("/:chartId/update", auth, controller.updateChart);

router.post("/certifications", auth, controller.updateCerts);

router.get("/number", auth, controller.getChartNumber);

router.get("/:chartId/pdf", auth, controller.downloadPdf);

router.get("/:chartId/pdfTest", controller.downloadPdfTest);

router.get("/patient/:chartId", auth, controller.viewPatientChart);



module.exports = router;
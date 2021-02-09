const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const controller = require('./controller');

// These will be prefixed with /charts/ :
router.get("/", auth, controller.viewAllCharts); // View all charts

router.post("/add", auth, controller.addChart);

router.get("/:chartId", auth, controller.viewChart);

//router.get("/")

router.post("/:chartId/update", auth, controller.updateChart);

module.exports = router;

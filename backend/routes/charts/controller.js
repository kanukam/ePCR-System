// @ts-check
const repo = require('./repository');

function viewChart(req, res){
  const id = req.params.chartId;
  repo.viewChart(id, (err, data) => {
    err 
      ? res.status(500).json({error: "internal server error"})
      : res.status(200).send(data)
  })
}

function viewAllCharts(req, res) {
  repo.viewAllCharts((err, data) => {
    err
      ? res.status(500).json({ error: "internal server error" })
      : res.status(200).send(data);
  })
}

function addChart(req, res) {
  const { body, pbody, patientID } = req.body;
  if(patientID !== null) {
    repo.addChartFromPatientID(body, patientID, (err) => {
      err
        ? res.status(500).json({ error: "internal server error" })
        : res.status(200).json({ status: 'Successfully added' });
    })
  }
  else {
    repo.addChart(body, pbody, (err) => {
      err
        ? res.status(500).json({ error: "internal server error" })
        : res.status(200).json({ status: 'Successfully added' });
    })
  }
}

function updateChart(req, res) {
  const chartID = req.params;
  const userID = req.user.id;
  
  const  { 
    call, 
    date, 
    times, 
    procedure,
    patientID
  } = req.body;

  const body = {
    call, 
    date, 
    times, 
    procedure
  }

  repo.updateChart(userID, chartID, patientID, body, err => {
    err 
      ? res.status(500).json({ error: "internal server error" }) 
      : res.status(200).json({ status: 'Successfully updated.' });
  })
}

function viewPatientChart(req, res){
  const id = req.params.chartId;
  repo.viewPatientChart(id, (err, chart) => {
    err 
      ? res.status(500).json({error: "internal server error"})
      : res.status(200).send({chart})
  })
}

function viewAllPatientCharts(req, res){
  repo.viewAllPatientCharts((err, charts) => {
    err 
      ? res.status(500).json({error: "internal server error"})
      : res.status(200).send({ charts })
  })
}

function summary(req, res) {
  const { from, to } = req.body;
  if (from && to && req.user.privilege === "admin") {
    repo.summary(from, to, (err, data) => {
      err
        ? res.status(500).json({ error: "Internal Server error" })
        : res.status(200).json({ data })
    })
  }
  else {
    res.status(400).json({ status: "Bad Request" });
  }
}

function updateCerts(req, res) {
  const { certifications, email } = req.body;
  if (certifications && email && req.user.privilege === "admin") {
    repo.updateCerts(certifications, email, (err, data) => {
      err
        ? res.status(500).json({ error: "Internal Server error" })
        : res.status(200).json({ userInfo: data })
    })
  }
  else {
    res.status(400).json({ status: "Bad Request" });
  }
}

function calls(req, res) {
  const { from, to } = req.body;
  if (from && to && req.user.privilege === "admin") {
    repo.calls(from, to, (err, data) => {
      err
        ? res.status(500).json({ error: "Internal Server error" })
        : res.status(200).json({ data })
    })
  }
  else {
    res.status(400).json({ status: "Bad Request" });
  }
}

function downloadPdf(req, res){
  const id = req.params.chartId;
  let locale = req.query.locale ? req.query.locale : 'EN';
  res.header('Content-disposition', 'inline; filename=' + `${id}_chart.pdf`);
  res.header('Content-type', 'application/pdf');
  repo.downloadPdf(id, locale, res, (err) => {
  })
}

function downloadPdfTest(req, res){
  let locale = req.query.locale ? req.query.locale : 'EN';
  res.header('Content-disposition', 'inline; filename=' + `test_chart.pdf`);
  res.header('Content-type', 'application/pdf');
  repo.downloadPdfTest(res, locale, (err) => {
    console.log(err);
  })
}

module.exports = { 
  viewChart, 
  viewAllCharts, 
  addChart, 
  updateChart, 
  viewPatientChart, 
  viewAllPatientCharts,
  summary,
  calls,
  downloadPdf,
  downloadPdfTest,
  updateCerts
};
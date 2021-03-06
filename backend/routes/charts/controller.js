// @ts-check
const repo = require('./repository');
const fs = require('fs');
const path = require('path');

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
  if (email && req.user.privilege === "admin") {
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

function getChartNumber(req, res){
  repo.getChartNumber((err, data) => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).json({ data })
  })
}

function upload(req, res) {
  const id = req.params.chartId;
  var file = req.files.myFile;
  if(!id || !file){
    res.status(400).json({ status: "Bad Request" });
  }
  else{
    var filename = file.name;
    fs.mkdir(path.join(__dirname, '../../', 'attachments'), (error) => {
      fs.mkdir(path.join(__dirname, '../../', 'attachments', id), (error) => {
        file.mv(path.join(__dirname, '../../', 'attachments', id, filename), (err) => {
          if(err){
            res.status(500).json({ error: "Error" })
          }
          else{
            fs.readdir(path.join(__dirname, '../../', 'attachments', id), (err, files) => {
              if(err){
                return res.status(500).json({ error: "Error" });
              }
              res.status(200).json(files);
            })
          }
        });
      });
    })
  }
}

function files(req, res) {
  const id = req.params.chartId;
  if (!id) {
    res.status(400).json({ status: "Bad Request" });
  }
  else {
    fs.readdir(path.join(__dirname, '../../', 'attachments', id), (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Error" });
      }
      res.status(200).json(files);
    })
  }
}

function downloadFile(req, res) {
  const chartId = req.params.chartId;
  const file = req.params.file;
  if (!chartId || !file) {
    res.status(400).json({ status: "Bad Request" });
  }
  else{
    const directoryPath = path.join(__dirname, '../../', 'attachments', chartId, file);
    res.download(directoryPath, (err) => {
      if(err){
        return res.status(500).json({ error: "Error" });
      }
    })
  }
  
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
  updateCerts,
  getChartNumber,
  upload,
  files,
  downloadFile
};
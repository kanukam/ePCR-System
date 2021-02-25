// @ts-check
const repo = require('./repository');

function viewChart(req, res){
  const id = req.params.chartId;
  repo.viewChart(id, (err, data) => {
    err 
      ? res.status(500).json({error: err})
      : res.status(200).send(data)
  })
}

function viewAllCharts(req, res) {
  repo.viewAllCharts((err, data) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).send(data);
  })
}

function addChart(req, res) {
  const { date, times, fname, lname, classify, gender, weight, address, phone, procedure } = req.body;
  // Empty string won't work for dates
  var { birth } = req.body;
  birth = birth || null;
  var pid = 0;
  // insert into patient table first
  var pbody= { fname: fname, lname: lname, birth: birth, classify: classify, gender: gender, weight: weight, address: address, phone: phone };
  var body = { date: date, times: times, patientID: pid, procedures: procedure, userID: req.user.id };
  repo.addChart(body, pbody, (err) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ status: 'Successfully added' });
  })
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
      ? res.status(500).json({ error: err }) 
      : res.status(200).json({ status: 'Successfully updated.' });
  })
}

module.exports = { viewChart, viewAllCharts, addChart, updateChart };
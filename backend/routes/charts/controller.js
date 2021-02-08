const db = require('../../sql/database');
const repo = require('./repository');

function viewAllCharts(req, res) {
  repo.viewAllCharts((err, data) => {
    err
      ? res.status(500).json({ error: err })
      : res.send(data);
  })
}

function addChart(req, res) {
  const { call, date, times, fname, lname, birth, classify, gender, weight, address, phone, procedure } = req.body;
  var pid = 0;
  // insert into patient table first
  var pbody= { fname: fname, lname: lname, birth: birth, classify: classify, gender: gender, weight: weight, address: address, phone: phone };
  var body = { call: call, date: date, times: times, patientID: pid, procedures: procedure, userID: req.user.id };
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
    patientID //This probably needs to be in the URL later
  } = req.body;
  db.query(`UPDATE charts SET call='${call}, date='${date}', times='${times}', procedures='${procedure}' 
            WHERE (userID=${userID} AND id=${chartID} AND patientID=${patientID})`, err => {
    err 
      ? res.status(500).json({ error: err }) 
      : res.status(200).json({ status: 'Successfully updated.' });
    
  })
}

module.exports = { viewAllCharts, addChart, updateChart };
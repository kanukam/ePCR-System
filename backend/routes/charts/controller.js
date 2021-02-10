const db = require('../../sql/database');
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
  const { date, incident, loctype, nature, disp, dest, agency, trauma, mci, va, times, fname, lname, birth, classify, gender, weight, address, phone, procedure } = req.body;
  var pid = 0;
  // insert into patient table first (might also need to use SELECT to see if the patient already exists later on)
  var pbody = { fname: fname, lname: lname, birth: birth, classify: classify, gender: gender, weight: weight, address: address, phone: phone };
  var body = { date: date, incident: incident, location: loctype, nature: nature, disposition: disp, destination: dest, agency: agency, trauma: trauma, mci: mci, va: va, times: times, procedures: procedure, patientID: pid, userID: req.user.id };
  repo.addChart(body, pbody, (err) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ status: 'Successfully added' });
  })
}

function updateChart(req, res) {
  const chartID = req.params;
  const userID = req.user.id;
  const {
    date,
    incident,
    location,
    nature,
    disposition,
    destination,
    agency,
    trauma,
    mci,
    va,
    times,
    procedure,
    patientID
  } = req.body;
  db.query(`UPDATE charts SET date='${date}', incident='${incident}, location='${location}', nature='${nature}', disposition='${disposition}', destination='${destination}', agency='${agency}', trauma='${trauma}', mci='${mci}', va='${va}', times='${times}', procedures='${procedure}' 
            WHERE (userID=${userID} AND id=${chartID} AND patientID=${patientID})`, err => {
    err 
      ? res.status(500).json({ error: err }) 
      : res.status(200).json({ status: 'Successfully updated.' });
    
  })
}

module.exports = { viewChart, viewAllCharts, addChart, updateChart };
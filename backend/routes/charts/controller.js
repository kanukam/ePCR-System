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
  const { body, pbody } = req.body;
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
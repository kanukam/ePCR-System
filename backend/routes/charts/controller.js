//const db = require('./validate');
const db = require('../../sql/database');

viewAllCharts = (req, res) => {
  //someone else can work on these if they want
}

addChart = (req, res) => {
  //someone else can work on these if they want
  const { no, type, date, patient } = req.body;
  validate.insert(no, type, date, patient, (err, completed) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal error please try again' });
    }
    else {
      res.status(200).json({ status: 'Successful' });
    }
  })

}

updateChart = (req, res) => {

}

module.exports = { viewAllCharts, addChart, updateChart };
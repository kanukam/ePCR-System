const db = require('../../sql/database');
const validate = require('./validate');

function viewAllCharts(req, res) {
  // currently using user id of 1,
  // need a get function to get the current user's id
  // should be similar to the getUsername function
  const userID = req.user.id;
  
  db.query('SELECT * FROM charts WHERE userID = 1', (err, results, fields) => {
  //db.query(`SELECT * FROM charts WHERE userID = ${userID}`, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    //console.log("hello" + results.data['date']);
  });
}

function addChart(req, resp) {
  const { call, date, times, patient, birth, weight, address, procedure } = req.body;
  var pid = 0;
  // insert into patient table first
  var body = { name: patient, birth: birth, weight: weight, address: address };
  var sql = 'INSERT INTO patients SET ?'
  db.query(sql, body, (err, res) => {
    if (err) 
    {
      console.log(err);
      return resp.status(500).json({ error: 'Internal error please try again' });
    }
    else {
      console.log(req);
      // if successful, save patient id
      pid = res.insertId;
      // insert into chart table associated with patient
      var pbody = { call: call, date: date, times: times, patientID: pid, procedures: procedure, userID: req.user.id };
      var sql = 'INSERT INTO charts SET ?';
      db.query(sql, pbody, (err, res) => {
        if (err){
          console.log(err);
          return resp.status(500).json({ error: 'Internal error please try again' });
        }
        else{
          resp.status(200).json({ status: 'Successfully added to chart' });
          console.log(res);
        }
      })
    }
  });
}

function updateChart(req, res) {
  const chartId = req.params;
}

module.exports = { viewAllCharts, addChart, updateChart };

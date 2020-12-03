const db = require('../../sql/database');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const validate = require('./validate');

function viewAllCharts(req, res) {
  // currently using user id of 1,
  // need a get function to get the current user's id
  // should be similar to the getUsername function
  db.query('SELECT * FROM charts WHERE userID = 1', (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    //console.log("hello" + results.data['date']);
  });
}

function addChart(req, res) {

  const { call, date, times, patient, birth, weight, address, procedure } = req.body;
  var pid = 0;
  token = req.cookies.token;
  // insert into patient table first
  validate.getId(token, (err, uId) => {
    if(err)
    {
      console.log(err);
    }
    else
    {
      var body = { name: patient, birth: birth, weight: weight, address: address };
      var sql = 'INSERT INTO patients SET ?'
      db.query(sql, body, (err, res) => {
        if (err) 
          throw err;
        else {
          // if successful, save patient id
          pid = res.insertId;
          // ID of user
          user = uId;
          // insert into chart table associated with patient
          var pbody = { call: call, date: date, times: times, patientID: pid, procedures: procedure, userID: user };
          var sql = 'INSERT INTO charts SET ?';
          db.query(sql, pbody, (err, res) => {
            if (err) throw err;
            else console.log(res);
          })
        }
      });
    }
    });
}

function updateChart(req, res) {

}

module.exports = { viewAllCharts, addChart, updateChart };
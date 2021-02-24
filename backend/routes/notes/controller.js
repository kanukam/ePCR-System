const repo = require('./repository');

function getAllNotes(req, res) {
    /*
    const patientid = req.params;
    const chartid = req.params; 
    repo.getAllNotes(patientid, chartid, (err, notes) => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).json({ notes });
    })
    */
  }

  module.exports = { getAllNotes }
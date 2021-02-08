const repo = require('./repository');

function getAllPatients(req, res) {
  const userID = req.user.userID;
  repo.getAllPatients(userID, (err, patients) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ patients });
  })
}

function updatePatient(req, res) {
  const patientID = req.params;
  const userID = req.user.id;
  const  { 
    patient, 
    birth, 
    weight, 
    address
  } = req.body;

  const body = {
    patient,
    birth,
    weight,
    address
  };

  repo.updatePatient(patientID, userID, body, err => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({});
  })
}

function addPatient(req, res) {
  const userID = req.user.id;
  const { patient, birth, weight, address } = req.body;
  const body = { 
    name: patient, 
    birth, 
    weight, 
    address 
  };

  repo.addPatient(userID, body, (err, patientID) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ newPatientID: patientID });
  })
}

function getPatient(req, res){
  const patientID = req.params['patientId'];
  const userID = req.user.id;
  repo.getPatient(patientID, userID, (err, patient) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ patient });
  })
}

module.exports = { getAllPatients, getPatient, addPatient, updatePatient };

const repo = require('./repository');
const chartRepo = require('../notes/repository');

function createNote(req, res){
    const { userId, chartId } = req.params;
    const { note } = req.body;
  
    chartRepo.addNote(userId, chartId, note, err => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).json({});
    })
  
  }
  
  function viewNotes(req, res){
    const { userId, chartId } = req.params;
    chartRepo.viewAllNotes(userId, chartId, (err, notes) => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).send(notes);
    })
  }

  module.exports = {viewNotes, createNote};
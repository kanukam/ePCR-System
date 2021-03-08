const repo = require('./repository');
const chartRepo = require('../notes/repository');

function createNote(req, res){
    const { chartId } = req.params;
    const { note } = req.body;
    const userId = req.user.id;

    chartRepo.addNote(userId, chartId, note, err => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).json({});
    })
  
  }
  
  function viewNotes(req, res){
    const { chartId } = req.params;
    chartRepo.viewAllNotes(chartId, (err, notes) => {
      err
        ? res.status(500).json({ error: err })
        : res.status(200).send(notes);
    })
  }

  module.exports = {viewNotes, createNote};
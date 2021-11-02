const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');

router.get('/list', async ( req, res ) => {
  Task.find(req.query).exec().then(docs => {
    res.status(200).json({
      tasks : docs
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.post('/', async ( req, res ) => {
  const task = new Task({
    _id : new mongoose.Types.ObjectId(),
    ...req.body
  });
  task.save().then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.patch('/:id', async ( req, res ) => {
  Task.update({_id : req.params.id}, req.body).then(() => {
    res.status(200).json({
      message : 'Task updated.',
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.get('/:id', async ( req, res ) => {
  Task.findById(req.params.id).then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.delete('/:id', async ( req, res ) => {
  Task.deleteOne({_id : req.params.id}).then(() => {
    res.status(200).json({
      message : 'Task deleted.',
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

module.exports = router;

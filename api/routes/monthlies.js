const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Monthly = require('../models/monthly');

router.get('/list', async ( req, res ) => {
  Monthly.find(req.query).exec().then(docs => {
    res.status(200).json({
      monthlies : docs
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.post('/', async ( req, res ) => {
  const [ year, month, day ] = req.body.exp_date.split('-')

  const monthly = new Monthly({
    _id : new mongoose.Types.ObjectId(),
    month_id: (+month) + ((+year-2010)*12),
    ...req.body
  });

  monthly.save().then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.patch('/:id', async ( req, res ) => {
  Monthly.update({_id : req.params.id}, req.body).then(() => {
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
  Monthly.findById(req.params.id).then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.delete('/:id', async ( req, res ) => {
  Monthly.deleteOne({_id : req.params.id}).then(() => {
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

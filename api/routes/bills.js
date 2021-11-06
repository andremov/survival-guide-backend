const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bill = require('../models/bill');

router.get('/list', async ( req, res ) => {
  Bill.find(req.query).exec().then(docs => {
    res.status(200).json({
      bills : docs
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.get('/options/people', async ( req, res ) => {
  Bill.find().exec().then(docs => {
    res.status(200).json({
      options : docs.map(item => item.person_name).filter((value, index, self) => self.indexOf(value) === index)
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.get('/options/institutions', async ( req, res ) => {
  Bill.find().exec().then(docs => {
    res.status(200).json({
      options : docs.map(item => item.institution).filter((value, index, self) => self.indexOf(value) === index)
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});router.get('/list', async ( req, res ) => {

  const stages = [
    {
      $sort : -1
    },
  ];

  Bill.aggregate(stages).then(docs => {
    res.status(200).json({
      bills : docs
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.post('/', async ( req, res ) => {
  const bill = new Bill({
    _id : new mongoose.Types.ObjectId(),
    ...req.body
  });
  bill.save().then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.patch('/:id', async ( req, res ) => {
  Bill.update({_id : req.params.id}, req.body).then(() => {
    res.status(200).json({
      message : 'Bill updated.',
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.get('/:id', async ( req, res ) => {
  Bill.findById(req.params.id).then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

router.delete('/:id', async ( req, res ) => {
  Bill.deleteOne({_id : req.params.id}).then(() => {
    res.status(200).json({
      message : 'Bill deleted.',
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    });
  });
});

module.exports = router;

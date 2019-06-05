var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const sequelize = require('sequelize');
const Op = sequelize.Op;

// GET All Events
router.get('/', function(req, res) {
  Event.findAll({
    attributes: ['sport', [sequelize.fn('array_agg', sequelize.col('name')), 'events']],
    group: 'sport'
  })
  .then(events => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(events));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
})

// GET All Medalists for an Event
router.get('/:id/medalists', function(req, res) {
  Event.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['name'],
    include: [{
      model: Olympian,
      where: { medal: { [Op.not]: null } },
      attributes: ['name', 'team', 'age', 'medal']
    }]
  })
  .then(medalists => {
    res.setHeader("Content-Type", "application/json");
    if (medalists === null){
      res.status(404).send('No medalists for that event');
    }
    else{
      res.status(200).send(JSON.stringify(medalists));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
})


module.exports = router;

var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
const sequelize = require('sequelize');
pry = require('pryjs')

// GET all olympians
router.get("/", function(req, res) {
  Olympian.findAll({
    attributes: ['sport', 'team', 'age', 'name', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
    group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
  })
    .then(olympians => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({ olympians: olympians }));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
});

module.exports = router;

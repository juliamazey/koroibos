var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
const sequelize = require('sequelize');
pry = require('pryjs')

// GET all olympians
router.get("/", function(req, res) {
  if (req.query.age === 'oldest')
   { Olympian.findOne({
     attributes: ['name', 'team', 'age', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
     group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name'],
     order: [['age', 'DESC']]
   })
   .then(olympian => {
     res.setHeader("Content-Type", "application/json");
     res.status(200).send({olympian: olympian});
   })
   .catch(error => {
     res.status(500).send({ error })
   }); }
   else if (req.query.age === 'youngest')
     { Olympian.findOne({
       attributes: ['name', 'team', 'age', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
       group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name'],
       order: [['age', 'ASC']]
     })
     .then(olympian => {
       res.status(200).send({olympian: olympian});
     })
     .catch(error => {
       res.status(500).send({ error })
     }); }
   else {
     Olympian.findAll({
       attributes: ['name', 'team', 'age', 'sport', [sequelize.fn('COUNT', sequelize.col('medal')), 'total_medals_won']],
       group: ['Olympian.sport', 'Olympian.team', 'Olympian.age', 'Olympian.name']
     })
     .then(olympians => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).send(JSON.stringify({ olympians: olympians }));
     })
     .catch(error => {
       res.setHeader("Content-Type", "application/json");
       res.status(500).send({ error })
     });
   }
});

module.exports = router;

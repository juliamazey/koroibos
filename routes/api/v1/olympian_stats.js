var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
const sequelize = require('sequelize');
pry = require('pryjs');

// GET Olympian Stats
router.get("/", async function(req, res) {
  try {
    const count = await getCount()
    const avg_male_weight = await getAverage('M')
    const avg_female_weight = await getAverage('F')
    const avg_age = await getAge()
    const stats = {
    	      olympian_stats: {
    	        total_competing_olympians: count,
    	        average_weight: {
    	          unit: 'kg',
    	          male_olympians: avg_male_weight[0].dataValues.weight,
    	          female_olympians: avg_female_weight[0].dataValues.weight
    	        },
    	        average_age: avg_age[0].dataValues.age
    	      }
    	    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(stats);
	  } catch (error) {
	    console.log(error)
	    res.status(500).send({ error })
	  }
});

  function getCount() {
    return Olympian.count({})
  };

  function getAverage(sex) {
    return Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('weight')), 'weight']],
      where: { sex: sex }
    })
  }

  function getAge(){
    return Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'age']]
    })
  }

module.exports = router;

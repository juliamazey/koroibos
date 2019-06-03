var fs = require('fs');
var csv =  require('fast-csv');
const Event = require('./models').Event
const Olympian = require('./models').Olympian
const Medalist = require('./models').Medalist

let counter  = 0;
let csvStream = csv.fromPath("data.csv", {headers: true})
.on('data', (record)=>  {
  csvStream.pause();
  let name = record.Name;
  let sex = record.Sex;
  let age = record.Age;
  let team = record.Team;
  let sport = record.Sport;
  let title = record.Event;
  let medal = record.Medal;

  Event.findOrCreate({
    where: {
      name: title,
      sport: sport
    }
  }).then(event => {
    Olympian.findOrCreate({
      where: {
        name: name,
        sex: sex,
        age: age,
        team: team,
        sport: sport,
        medal: medal
      }
    }).then(olympian => {
      var olympian_id = olympian[0].id
      var event_id = event[0].id
      Medalist.findOrCreate({
        where: {
          OlympianId: olympian_id,
          EventId: event_id,
        }
      })
    })
  });

  counter ++;
  csvStream.resume();
})
.on('end',function(end) {
  console.log('Finished Importing');
})
.on('err',function(err) {
  return console.log(err);
});

setTimeout(function() {
  process.exit();
}, 30000);

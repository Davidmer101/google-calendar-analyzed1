import sqlite3 from 'sqlite3' //importing sqlite3
sqlite3.verbose();  //

//creating database
let db = new sqlite3.Database('./tutorialdb.sqlite')


db.serialize(function() {
  db.run('DROP TABLE IF EXISTS month')
  db.run("CREATE TABLE IF NOT EXISTS month (eventName TEXT, startTime TEXT, endTime TEXT, calendar TEXT, duration REAL )");

  var stmt = db.prepare("INSERT INTO month VALUES (?,?, ?, ?, ?)");
//   for (var i = 0; i < 10; i++) {
  
//   var d = new Date();
//   var n = d.toLocaleTimeString();
//   stmt.run(i, n);
//   }
  let eventName1 = "Codeacademy - python"
  let startTime1 = "9/1/2021 10:30:00"
  let endTime1 = "9/1/2021 11:45:00"
  let calendar1 = "Education"
  let duration1 = duration(startTime1, endTime1)

  let eventName2 = "Adane - education"
  let startTime2 = "9/14/2021 13:30:00"
  let endTime2 = "9/14/2021 14:00:00"
  let calendar2 = "Family" 
  let duration2 = duration(startTime2, endTime2)

  let eventName3 = "Personal Project"
  let startTime3 = "9/16/2021 12:30:00"
  let endTime3 = "9/16/2021 13:30:00"
  let calendar3 = "Education" 
  let duration3 = duration(startTime3, endTime3)
 

  stmt.run(eventName1, startTime1, endTime1, calendar1, duration1);
  stmt.run(eventName2, startTime2, endTime2, calendar2, duration2);
  stmt.run(eventName3, startTime3, endTime3, calendar3, duration3);

  
  stmt.finalize();

  db.each("SELECT eventName, startTime, endTime, calendar, duration FROM month", function(err, row) {
      console.log(row.eventName, row.startTime, row.endTime, row.calendar, row.duration);
  });

  let groupByCalendars = "SELECT calendar, SUM(duration) as duration FROM month GROUP BY calendar"
  db.each( groupByCalendars, function (err, row) {
        console.log(row.calendar, row.duration)
  });
//   db.run()
});

db.close();

// calculate difference between times (time2 - time1)
function duration(time1, time2) {
    let milliseconds =  new Date(time2) - new Date(time1)
    let hours = milliseconds/(1000*60*60)
    return hours
}

//
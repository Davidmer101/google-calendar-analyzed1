// var sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3'
sqlite3.verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize (function() {
    db.run('DROP TABLE IF EXISTS Weeks')
    db.run('CREATE TABLE IF NOT EXISTS Weeks (eventName TEXT, startTime TEXT, endTime TEXT)' );
    console.log('Hello')
    db.run('INSERT INTO Weeks (eventName, startTime, endTime) VALUES (Soccer, ' +  datetime('now') + ',' +  datetime('now', 'localtime') )
    db.each("SELECT eventName AS name, startTime, endTime FROM Weeks", function(err, row) {
        print(err)
        console.log(row.name + ": " + row.startTime + ": " + row.endTime);
    });
})



// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

db.close();
// DB를 불러오는 코드들

const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./database/restaurants.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db

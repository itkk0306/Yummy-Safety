// https://github.com/kriasoft/node-sqlite#readme
import sqlite3 from "sqlite3";

sqlite3.verbose();

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

export const query = (sql, onError, onSuccess) => {
  db.all(sql, [], (err, rows) => {
    if (err) return onError(err);
    onSuccess(rows);
  });
};

export default db;

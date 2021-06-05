import express from "express";
import db, { query } from "../database";

const router = express.Router();

router.get('/', (req, res, next) => {
  const city = req.query.city;
  const town = req.query.town;
  const page = req.query.offset * 10 || 0;

  let sql;
  if (city && town) {
    sql = `SELECT * FROM restaurants WHERE city = '${city}' AND town ='${town}' LIMIT 10 OFFSET ${page}`;
  } else {
    sql = `SELECT * FROM restaurants LIMIT ${page}, 10`;
  }

  // LIMIT <skip>, <count>
  console.log(sql);

  query(sql,
    (err) => {
      res.status(400).json({ "error": err.message });
    },
    (rows) => {

      query('SELECT count(*) as count FROM restaurants', (err) => console.error(err.message),
        (row) => {
          res.render("index", {
            isAll: city && town,
            city: city,
            town: town,
            page: req.query.offset,
            total: row[0].count,
            restaurants: rows,
          });
        });
    });
});

export default router;

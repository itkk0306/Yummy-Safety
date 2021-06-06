import express from "express";
import { query } from "../database";

const router = express.Router();

router.get('/', (req, res, next) => {
  const city = req.query.city;
  const town = req.query.town;
  const offset = req.query.offset * 10 || 0;

  let sql;
  if (city && town) {
    sql = `SELECT * FROM restaurants WHERE city = '${city}' AND town ='${town}' LIMIT 10 OFFSET ${offset}`;
  } else {
    sql = `SELECT * FROM restaurants LIMIT ${offset}, 10`;
  }
  
  query(sql,
    (err) => {
      res.status(400).json({ "error": err.message });
    },
    (rows) => {
      query('SELECT count(*) as count FROM restaurants', (err) => console.error(err.message),
        (row) => {
          const result = {
            isAll: city && town,
            city: city,
            town: town,
            offset: offset,
            total: row[0].count,
            restaurants: rows,
          };
          res.render("index", result);
        });
    });
});

export default router;

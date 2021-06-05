import express from "express";
import db from "../database";

const router = express.Router();

router.get('/', (req, res, next) => {
  // const sql = `SELECT * FROM restaurants where city = '${req.query.city}'and town ='${req.query.town}'`;
  // db.all(sql, [], (err, rows) => { //rows 는 결과값
  //   if (err) {
  //     res.status(400).json({ "error": err.message });
  //     return;
  //   }
  //   res.render('notice', { restaurants: rows });
  // });
  res.render("notice");
});

export default router;

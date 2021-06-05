import express from "express";
import db from "../database";

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query.city);
    const sql =`SELECT * FROM restaurants where city = '${req.query.city}'and town ='${req.query.town}'`;
    db.all(sql, [], (err, rows) => { //rows 는 결과값
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        // console.log(rows.map(row => row.name));

        res.render('noticeCanceled', {restaurants: rows});
    });
});

export default router;

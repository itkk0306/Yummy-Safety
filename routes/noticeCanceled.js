const express = require('express');
const router = express.Router();
// Readme db 사용법 https://github.com/kriasoft/node-sqlite#readme
const db = require("../database");

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

module.exports = router;

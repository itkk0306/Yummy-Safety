const express = require('express');
const router = express.Router();
// Readme db 사용법 https://github.com/kriasoft/node-sqlite#readme
const db = require("../database");
const _ = require("lodash");

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query.city);
    const sql =`SELECT DISTINCT city, town FROM restaurants;`;

    db.all(sql, [], (err, rows) => { //rows 는 결과값
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        // console.log(rows.map(row => row.name));
        console.log(_.chain(rows)
            // Group the elements of Array based on `color` property
            .groupBy("city")
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) => ({ city: key, town: value.map(v => v.town) }))
            .value());

        res.render('selectRegion', {restaurants:
                _.chain(rows)
                    .groupBy("city")
                    .map((value, key) => ({ city: key, town: value.map(v => v.town) }))
                    .value()});
    });
});


module.exports = router;
import express from "express";
import db from "../database";

const router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

    var of = req.query.offset;
    console.log("LOG!!!!!  " + of)
    if (of == undefined) {
        of = 0;
    } else {
        of = req.query.offset;
    }

    // 들어오는 값 city, town, offset
    //const sql =`SELECT * FROM restaurants where city = '${req.query.city}'and town ='${req.query.town}' limit 5 offset '${req.query.offset}'`;
    const sql = `SELECT * FROM restaurants where city = '충청남도' and town ='천안시' limit 10 offset ${of}`;

    console.log(req.query.city);
    console.log(req.query.offset);

    console.log(sql);
    db.all(sql, [], (err, rows) => { //rows 는 결과값
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        // console.log(rows.map(row => row.name));
        console.log(rows);


        res.render('mainIndex', {restaurants: rows});
    });
});

export default router;

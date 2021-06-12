import express from "express";
import { query } from "../database";

const router = express.Router();

router.get('/', (req, res, next) => {
  const category = req.query.category || null;
  if (category) {
    const sql = `SELECT * FROM notices WHERE category_id = ${category}`;
    query(sql, (err) => {
      res.status(400).json({ "error": err.message });
    }, (rows) => {
      res.render("noticeCategories", { title: req.query.categoryName, notices: rows });
    });
  } else {
    const sql = 'SELECT * FROM notice_categories';
    query(sql, (err) => {
      res.status(400).json({ "error": err.message });
    }, (rows) => {
      res.render("notice", { noticeCategories: rows });
    });
  }
});

router.get('/:id', (req, res, next) => {
  const sql = `SELECT * FROM notices WHERE id = ${req.params.id} LIMIT 1`;
  query(sql, (err) => {
    res.status(400).json({ "error": err.message });
  }, (rows) => {
    res.render("noticeDetail", { title: req.query.categoryName, notice: rows[0] });
  });
});

export default router;

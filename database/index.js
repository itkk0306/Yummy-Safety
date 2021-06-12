// CREATE TABLE notice_categories (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT
//  );
//
// create table notices (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   category_id INTEGER,
//   title TEXT,
//   content TEXT,
//   created_at TEXT
// );
//
// INSERT INTO notice_categories (name) VALUES ('알립니다');
// INSERT INTO notice_categories (name) VALUES ('취소된 안심식당');
//
// INSERT INTO notices (category_id, title, content, created_at) VALUES (1, '이용방법', '메인페이지에서 [지역 선택] 메뉴에 들어가 열람하고자 하는 지역을 선택해 안심식당을 찾아주세요!', '2021-05-19');
// INSERT INTO notices (category_id, title, content, created_at) VALUES (1, '문의하는 방법', 'itkk0306@naver.com 으로 문의나 항의 메일을 보내주세요!/n하지만 .. 웬만하면 항의하지 말아주세요../n그럼에도 불구하고.. 항의 달게 받겠습니다..', '2021-05-19');
//
// INSERT INTO notices (category_id, title, created_at) VALUES (2, '서울시 동작구 사당로 ‘아미네’ 삭제', '2021-05-19');
// INSERT INTO notices (category_id, title, created_at) VALUES (2, '서울시 중구 광화문로 ‘슬기네’ 삭제', '2021-05-19');

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

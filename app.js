import express from "express";
import createError from "http-errors";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";


import mainIndexRouter from "./routes/mainIndex";
import indexRouter from "./routes/index";
import aboutRouter from "./routes/about";
import noticeRouter from "./routes/notice";
import selectRegionRouter from "./routes/selectRegion";
import noticeInformRouter from "./routes/noticeInform";
import noticeCanceledRouter from "./routes/noticeCanceled";
import howToUseRouter from "./routes/howToUse";
import howToInquireRouter from "./routes/howToInquire";

// const mainIndexRouter = require('./routes/mainIndex');
// const indexRouter = require('./routes/index');
// const aboutRouter = require('./routes/about');
// const noticeRouter = require('./routes/notice');
// const selectRegionRouter = require('./routes/selectRegion');
// const noticeInformRouter = require('./routes/noticeInform');
// const noticeCanceledRouter = require('./routes/noticeCanceled');
// const howToUseRouter = require('./routes/howToUse');
// const howToInquireRouter = require('./routes/howToInquire');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set("layout extractScripts", true);

// settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

//app.use('/', indexRouter);
app.use('/', mainIndexRouter);
app.use('/index', indexRouter);
app.use('/about', aboutRouter);
app.use('/selectRegion', selectRegionRouter);
app.use('/notice', noticeRouter);
app.use('/noticeInform', noticeInformRouter);
app.use('/noticeCanceled', noticeCanceledRouter);
app.use('/howToUse', howToUseRouter);
app.use('/howToInquire', howToInquireRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

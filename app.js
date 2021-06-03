const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mainIndexRouter = require('./routes/mainIndex');
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const selectRegionRouter = require('./routes/selectRegion')
const noticeRouter = require('./routes/notice');
const noticeInformRouter = require('./routes/noticeInform');
const noticeCanceledRouter = require('./routes/noticeCanceled');
const howToUseRouter = require('./routes/howToUse');
const howToInquireRouter = require('./routes/howToInquire');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.set('layout', 'layout');
app.set("layout extractScripts", true);

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
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

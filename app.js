var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let cookieSession=require("cookie-session");
var register = require('./routes/register');
var login = require('./routes/login');
var shu = require('./routes/shu');
var only = require('./routes/only');
var top = require('./routes/top');
var shop = require('./routes/shop');
var list = require('./routes/list');
var cart = require('./routes/cart');
var update = require('./routes/update');
var removeli = require('./routes/removeli');
var removeul = require('./routes/removeul');
var removesome = require('./routes/removesome');
var app = express();
app.use(cookieSession({
  name:'mysession',
  maxAge:1000*360*24*7,
    keys:['aa','bbb']
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register',register);
app.use('/login', login);
app.use('/shu',shu);
app.use('/only',only);
app.use('/top',top);
app.use('/shop',shop);
app.use('/list',list);
app.use('/cart',cart);
app.use('/update',update);
app.use('/removeli',removeli);
app.use('/removeul',removeul);
app.use('/removesome',removesome);
app.use('/cancel',(req,res)=>{
  delete req.session.username;
  res.end();
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const express = require('express');
const app = express();
const session= require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser= require('cookie-parser');

app.use(cookieParser('123'));
app.use(session({
  secret: 'keyboard cat',
  name: 'session_id',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60, secure: false},
  rolling: true,
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/stupid',
    touchAfter: 24*3600,
  }),
}));
app.get('/', (req, resp)=>{
  req.session.username='zhangsan';
  resp.send('set session to db');
});
app.listen(3000);

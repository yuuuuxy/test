const express = require('express');
const app = express();
const session = require('express-session');
const admin = require('./routes/admin/admin');
const product = require('./routes/admin/product/product');
const login = require('./routes/admin/login');
const multiparty = require('multiparty');
const form = new multiparty.Form();
form.uploadDir = 'upload';

app.use(session({
  secret: 'keyboard cat',
  resave: false, // session未修改是否保存
  saveUninitialized: true, // 强制存储session
  cookie: {
    maxAge: 1000*60*30,
  },
  rolling: true,
}));
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use('/upload', express.static('upload'));

app.use('/login', login);
app.use('/admin', admin);
app.use('/product', product);
app.listen(3000);

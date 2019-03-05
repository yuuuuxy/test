const express = require('express');
const app = express();

app.get('/', (req, resp)=>{
  resp.send('你好啊');
});
app.set('view engine', 'ejs');/* 配置ejs模板引擎*/

app.get('/index', (req, resp)=>{
  resp.render('index', {dir: __dirname});
});
app.use(express.static('static'));// 给static目录下面的提供静态服务
app.listen('3001');

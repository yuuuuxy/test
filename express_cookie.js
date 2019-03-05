const express = require('express');
const app = express();
const cookieParser= require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, resp)=>{
  resp.send('你好 nodejs');
});
app.get('/set', (req, resp)=>{
  resp.cookie('username', 'nnnname', {maxAge: 60000});
  resp.send('set success');
});
app.get('/getCookie', (req, resp)=>{
  console.log(req.cookies);
  resp.send(req.cookies);
});
app.listen(3000);

const express = require('express');
const app = express();
const cookieParser= require('cookie-parser');

app.use(cookieParser('111231'));

app.get('/', (req, resp)=>{
  resp.send(req.signedCookies);
});
app.get('/set', (req, resp)=>{
  resp.send('set success');
});
app.get('/getCookie', (req, resp)=>{
  console.log(req.signedCookies);
  resp.send(req.signedCookies);
});
app.get('/root', (req, resp)=>{
  resp.cookie('pages', '/root');
  resp.end('success');
});
app.listen(3000);

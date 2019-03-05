const express = require('express');
const app = express();/* 实例化*/
const url = require('url');

app.get('/', (req, resp)=>{
  resp.send('你好啊');
});
app.get('/news/:nid', (req, resp)=>{
  console.log(req);
  console.log('params:'+req.params.nid);
  resp.end(req.params.nid);
});

app.get('/newsget', (req, resp)=>{
  console.log(url.parse(req.url, true).query.aid);
  resp.end(url.parse(req.url, true).query.aid);
});

app.listen(3000);

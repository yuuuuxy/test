const http = require('http');
const router = require('./model/router');
const ejs = require('ejs');
const url = require('url');

http.createServer(function(req, resp) {
  let data='这是后台的数据';
  let ul = ['<div style="color: lightseagreen;">1</div>',
    '<div style="color: lightblue;">2</div>',
    '3',
    '4'];
  resp.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  const pathname = url.parse(req.url).pathname;
  if (pathname=='/login') {
    ejs.renderFile('views/index.ejs', {
      msg: data,
      list: ul,
    }, function(err, data) {
      resp.end(data);
    });
  }
}).listen(8000, '127.0.0.1');

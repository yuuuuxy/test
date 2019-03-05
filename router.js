const http = require('http');
const url = require('url');
const model = require('./model/model');

http.createServer(function(req, resp) {
  let pathname = url.parse(req.url).pathname;
  if (pathname!='/favicon.ico') {
    pathname= pathname.replace('/', '');
    try {
      model.request(req, resp, pathname);
    } catch (e) {
      model[404](req, resp);
    }
  }
}).listen(8000, '127.0.0.1');

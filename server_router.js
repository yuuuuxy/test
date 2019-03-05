const http = require('http');
const router = require('./model/router');

http.createServer(function(req, resp) {
  let staticpath = 'static';
  router.statics(req, resp, staticpath);
}).listen(8000, '127.0.0.1');

const http = require('http');

http.createServer(function(req, resp) {
  resp.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  resp.end();
}).listen(8001, '127.0.0.1');

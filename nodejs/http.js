var http = require('http');

http.createServer(function (req,resp) {
    resp.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    resp.write('hello , nodejs');
    resp.end();
}).listen(8001);
var sd = require('silly-datetime')
var http = require('http')


http.createServer(function (req,resp) {
    resp.writeHead(200,{"Content-Type":"text/html;charset:utf-8"})

    resp.write(sd.format(new Date(), 'YYYY-MM-DD HH:mm'))
    resp.write('now:'+sd.fromNow(new Date()));
    resp.end();
}).listen(8001,'127.0.0.1')



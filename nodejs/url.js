var http = require('http');
var url = require('url');
//http://localhost:8001/new?aid=1&bid=2&cid=3
http.createServer(function (req,resp) {
    resp.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});


    resp.write('hello , nodejs这是中文111');

    if (req.url!='/favicon.ico'){
        var quire=url.parse(req.url,true);
        console.log(quire.query.aid)
        console.log(quire.query.cid)
    }
    resp.end();
    console.log(req.url);
}).listen(8001);
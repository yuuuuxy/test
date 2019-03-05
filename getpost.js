const http = require('http');
const ejs = require('ejs');
const url = require('url');
const fs = require('fs');

http.createServer(function(req, resp) {
  resp.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  const pathname = url.parse(req.url).pathname;
  if (pathname=='/login') {
    ejs.renderFile('views/index.ejs', { }, function(err, data) {
      resp.end(data);
    });
  } else if (pathname == '/form') {
    ejs.renderFile('views/form.ejs', {}, (err, data)=>{
      resp.end(data);
    });
  } else if (pathname == '/dologin') {
    let postStr ='';
    req.on('data', (chunk) => {
      postStr+=chunk;
    });
    req.on('end', (err, chunk)=>{
      console.log("postStr:"+postStr);
      fs.appendFile('login.txt', postStr+'\n', (err)=>{
        if (err) {
          console.log(err);
          return false;
        }
        console.log('write success');
        resp.end('<script>history.back();</script>');
      });
    });
  }
}).listen(8000, '127.0.0.1');

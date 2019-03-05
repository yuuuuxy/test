const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('./model/getmimefronfile');
const url = require('url');
const events = require('events');
const eventEmitter = new events.EventEmitter();

http.createServer(function(req, resp) {
  let urlname = req.url;
  console.log('url'+ urlname);
  const urlParse= url.parse(urlname, true);
  urlname = urlParse.pathname;

  if (urlname=='/') {
    urlname = '/index.html';
  }
  if (urlname!='/favicon.ico') {
    fs.readFile('static'+urlname, (err, data) => {
      if (err) {
        fs.readFile('static/404.html', (err, data404)=> {
          if (err) {
            console.log(err);
          } else {
            resp.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            resp.write(data404);
            resp.end();
          }
        });
      } else {
        const filename=path.extname(urlParse.pathname);
        mime.getMime(fs, eventEmitter, filename);
        eventEmitter.on('mimetype', (mistypes) => {
          console.log(mistypes);
          resp.writeHead(200, {'Content-Type': mistypes+';charset=utf-8'});
          resp.end(data);
        });
      }
    });
  }
}).listen(8001, '127.0.0.1');

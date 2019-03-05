const fs = require('fs');
const events = require('events');
const EventEmitter = new events.EventEmitter();
const url = require('url');
const path = require('path');

getMime = function(EventEmitter, extname) {
  fs.readFile('mime.json', (err, data)=> {
    if (err) {
      console.log(err);
      return false;
    }
    const Mimes = JSON.parse(data.toString());
    const result = Mimes[extname] || 'text/html';
    EventEmitter.emit('mimetype', result);
  });
};
exports.statics = function(req, resp, staticpathname) {
  let pathname = url.parse(req.url, true).pathname;
  if (req.url == '/') {
    pathname = '/index.html';
  }
  if (req.url!='favicon.ico') {
    fs.readFile(staticpathname+pathname, (err, data) => {
      if (err) {
        fs.readFile(staticpathname+'/404.html', (err, data)=>{
          resp.writeHead(200, {'Content-Type': 'text/html;charset:utf-8'});
          resp.end(data);
        });
      }
      getMime(EventEmitter, path.extname(pathname));
      EventEmitter.on('mimetype', (mimetype)=>{
        resp.writeHead(200, {'Content-Type': mimetype +';charset:utf-8'});
        resp.end(data);
      });
    }
    );
  }
}


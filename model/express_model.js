const url = require('url');

function changeRes(resp, data) {
  resp.send = function(data) {
    resp.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    resp.end(data);
  };
}
const Server =function() {
  const G = this;
  this._get={};
  this._post = {};
  const app = function(req, resp) {
    changeRes(resp);
    const pathname = url.parse(req.url).pathname;
    const method = req.method.toLowerCase();
    if (G['_'+method][pathname]) {
      if (method=='post') {
        let postStr = '';
        req.on('data', (chunk)=>{
          postStr+=chunk;
        });
        req.on('end', (err, chunk)=>{
          req.body = postStr;
          console.log(postStr);
        });
        G['_'+method][pathname](req, resp);
      } else if ('get'==method) {
        G['_'+method][pathname](req, resp);
      }
    } else {
      G._get['/404'](req, resp);
    }
  };
  app.get = function(string, callback) {
    G._get[string] = callback;
  };
  app.post = function(string, callback) {
    G._post[string] = callback;
  };
  return app;
};


module.exports = Server();

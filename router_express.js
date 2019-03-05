const http = require('http');
const G={};
const url = require('url');

const app = function(req, res) {
  const pathname= url.parse(req.url).pathname.replace('/', '');
  if (G[pathname]) {
    G[pathname](req, res);
    res.end();
  } else {
    res.end('no router');
  };
};

app.get = function(string, callback) {
  G[string]=callback;
};
app.get('regist', (req, res)=>{
  console.log('regist');
});
app.get('login', (req, res)=>{
  console.log('login');
});
http.createServer(app).listen(3000);


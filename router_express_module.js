const http = require('http');
const app = require('./model/express_model');
const ejs = require('ejs');

http.createServer(app).listen(8000, '127.0.0.1');
app.get('/login', (req, resp)=>{
  ejs.renderFile('views/index.ejs', {}, (err, data)=>{
    resp.send(data);
  });
});
app.get('/', (req, resp)=>{
  ejs.renderFile('views/form.ejs', {}, (err, data)=>{
    resp.send(data);
  });
});
app.get('/form', (req, resp)=>{
  ejs.renderFile('views/form.ejs', {}, (err, data)=>{
    resp.send(data);
  });
});
app.get('/404', (req, resp)=>{
  ejs.renderFile('views/404.ejs', {}, (err, data)=>{
    resp.send(data);
  });
});


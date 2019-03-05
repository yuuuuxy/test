const http = require('http');
const app = require('./model/express_model');
const ejs = require('ejs');
const MongoClient= require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017';
http.createServer(app).listen(8000);

app.get('/find', (req, resp)=>{
  MongoClient.connect(dburl, (err, client)=>{
    let col = client.db('stupid').collection('user');
    col.find().limit(10).toArray((err, data)=>{
      console.log(data);
      client.close();
      ejs.renderFile('./views/data.ejs', {msg: data}, (err, result)=>{
        resp.send(result);
      });
      resp.end();
    });
  });
});
app.get('/404', (req, resp)=>{
  ejs.renderFile('./views/404.ejs', {}, (err, result)=>{
    resp.send(result);
  });
});

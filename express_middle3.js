const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient= require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017';

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');// 配置ejs
app.get('/', (req, resp)=>{
  resp.render('form');
});
app.post('/add', (req, resp)=>{
  console.log(req.body);
  MongoClient.connect(dburl, (err, client)=>{
    if (err) {
      console.log('connect error! \n'+err);
      return false;
    }
    const db = client.db('userm').collection('userm');
    db.insertOne({
      'name': req.body.username,
      'pwd': req.body.password,
    }, (errAdd, result)=>{
      if (errAdd) {
        console.log('add err!\n'+errAdd);
      }
      resp.end('add success');
      client.close();
    });
  });
});
app.use((req, resp)=>{
  resp.render('404');
});
app.listen('3001');

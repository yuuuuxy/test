const http = require('http');
const ejs = require('ejs');
const app = require('./model/express_model');
const MongoClient = require('mongodb').MongoClient;
const urlParse= require('url');
const url = 'mongodb://localhost:27017';

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

app.get('/add', (req, resp)=>{
  MongoClient.connect(url, (err, client)=>{
    console.log('connect success');
    const col = client.db('stupid').collection('user');
    col.insertOne({
      'name': 'from node js',
      'age': 10,
    }, {w: 1}, (errAdd, result)=>{
      if (errAdd) {
        console.log('add err');
        return;
      }
      client.close();
      console.log('add success');
      resp.send('add success');
    });
  });
});
app.get('/modify', (req, resp)=>{
  MongoClient.connect(url, (err, client)=>{
    const col = client.db('stupid').collection('user');
    col.updateOne({'name': 'from node js'}, {$set: {
      'age': 30,
    }}, (error, data)=>{
      resp.end('modify suess');
      console.log(data);
      client.close();
    });
  });
});
app.get('/delete', (req, resp)=>{
  const urlData = urlParse.parse(req.url, true);
  const delName = urlData.query.name;
  MongoClient.connect(url, (err, client)=>{
    const db = client.db('stupid').collection('user');
    db.remove({'name': delName}, (error, data)=>{
      resp.send('delete success');
      console.log(data);
      client.close();
    });
  });
});
app.get('/deleteAll', (req, resp)=>{
  const urlData = urlParse.parse(req.url, true);
  const delName = urlData.query.name;
  MongoClient.connect(url, (err, client)=>{
    const db = client.db('stupid').collection('user');
    db.remove({'name': '/'+delName+'/'}, (error, data)=>{
      resp.send('delete success');
      console.log(data);
      client.close();
    });
  });

});

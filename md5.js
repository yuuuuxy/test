const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const md5 = require('md5-node');
console.log(md5('admin'));
MongoClient.connect(dbUrl, (err, client)=>{
  const col = client.db('productManager').collection('user');
  /* col.update({'username': '21232f297a57a5a743894a0e4a801fc3'}, {$set: {'username': 'admin'}}, (err2, result)=>{
    if (err2) {
      console.log('update err');
    }
  });*/
  const col2 = client.db('productManager').collection('product');

  col2.insertOne({'title': 'huawei', 'price': '$299', 'postage': '￥30'}, (err, result)=>{
    if (err) {
      console.log('insert err');
    }
  });
});



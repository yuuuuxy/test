const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
var objectId = require('mongodb').ObjectId;
function __connectDb(callback) {
  MongoClient.connect(dbUrl, (err, client)=>{
    if (err) {
      console.log('db connect err');
      console.log(err);
    }
    callback(client);
    client.close();
  });
}
/*
查询
 */
module.exports.find=(db, collection, cdt, callback)=>{
  __connectDb((client)=>{
    console.log(cdt);
    const result = client.db(db).collection(collection).find(cdt);
    result.toArray((errArray, docs)=>{
      callback(errArray, docs);
    });
  });
};

/*
添加
 */
module.exports.insertOne = (db, collection, json, callback)=>{
  __connectDb((client)=>{
    const col = client.db(db).collection(collection);
    col.insertOne(json, (err, result)=>{
      callback(err, result);
    });
  });
};
/*
修改
 */
module.exports.updateOne = (db, collection, jsonFind, jsonUpdate, callback)=>{
  __connectDb((client)=>{
    const col = client.db(db).collection(collection);
    col.update(jsonFind, {$set: jsonUpdate}, (err, result)=>{
      callback(err, result);
    } );
  });
};
/*
删除
 */
module.exports.deleteOne = (db, collection, json, callback)=>{
  __connectDb((client)=>{
    const col = client.db(db).collection(collection);
    col.remove(json, (err, result)=>{
      callback(err, result);
    });
  });
};
module.exports.objectId = objectId;

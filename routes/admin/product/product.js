const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const DB = require('../../../modules/db');

const ObjectId = require('mongodb').ObjectId;
const DBNAME = 'productManager';
const COLLECTION = 'product';
const form = new multiparty.Form();
form.uploadDir = 'upload';

router.get('/productList', (req, resp)=>{
  DB.find('productManager', 'product', {}, (err, dataList)=>{
    resp.render('admin/product/productList', {dataList: dataList});
  });
});

router.get('/productAdd', (req, resp)=>{
  resp.render('admin/product/productAdd');
});
router.get('/update', (req, resp)=>{
  const id = req.query._id;
  DB.find(DBNAME, COLLECTION, {'_id': new ObjectId(id.trim())}, (err, result)=>{
    resp.render('admin/product/productEdit', {result: result[0]});
  });
});

// 商品添加
router.post('/toAdd', (req, resp)=>{
  let title = '';
  let price = '';
  let postage = '';
  let discription = '';
  const prodPic = {};
  form.parse(req, function(err, fields, files) {
    title= fields['title'][0];
    price = fields['price'][0];
    postage = fields['postage'][0];
    discription = fields['discription'][0];
    prodPic.path = files.prodPic[0].path;
    DB.insertOne(DBNAME, COLLECTION,
        {title, price, postage, discription, prodPic},
        (err, result)=>{
          resp.redirect('/product/productList');
        });
  });
});
// 商品删除
router.get('/toDelete', (req, result)=>{
  const id = url.parse(req.url, true).query.id;
  DB.deleteOne(DBNAME, COLLECTION, {_id: new ObjectId(id)}, (err, result) => {
    resp.redirect('/product/productList');
  });
});

// 商品修改
router.post('/toUpdate', (req, resp)=>{
  let id = '';
  let title = '';
  let price = '';
  let postage = '';
  let discription = '';
  const prodPic = {};
  form.parse(req, (err, fields, files)=>{
    id= fields['id'][0];
    title= fields['title'][0];
    price = fields['price'][0];
    postage = fields['postage'][0];
    discription = fields['discription'][0];
    prodPic.path = files.prodPic[0].path;
    DB.updateOne(DBNAME, COLLECTION, {_id: new ObjectId(id.trim())},
        {
          title: title,
          price: price,
          postage: postage,
          discription: discription,
        },
        (err, result)=>{
          resp.redirect('/product/productList');
        });
  } );
});

router.post('/findByCdt', (req, resp)=>{
  form.parse(req, (err, fields, files)=>{
    const title = fields['title'][0];
    DB.find(DBNAME, COLLECTION, {title: '/'+title+'/'}, (err, result)=>{
      resp.redirect('/product/productList', {dataList: dataList});
    });
  });
});

module.exports = router;

const express = require('express');
const app = express();
// const bodyParser= require('body-parser');
const multiparty = require('multiparty');
const session = require('express-session');
const md5Node = require('md5-node');
const url = require('url');
const ObjectId = require('mongodb').ObjectId;

const DB = require('./modules/db');
const DBNAME = 'productManager';
const COLLECTION = 'product';
const form = new multiparty.Form();
form.uploadDir = 'upload';

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// 配置session



app.listen(3000);

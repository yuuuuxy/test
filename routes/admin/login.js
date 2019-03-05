const express = require('express');
const router = express.Router();
const md5Node = require('md5-node');
const multiparty = require('multiparty');
const DB = require('../../modules/db');
const app = express();
const form = new multiparty.Form();


router.get('/login', (req, resp)=>{
  resp.render('admin/login');
});
router.get('/', (req, resp)=>{
  resp.render('admin/public/index');
});
// 登陆事件
router.post('/tologin', (req, resp)=>{
  let username = '';
  let password = '';
  form.parse(req, (err, fields, files)=>{
    username = fields['username'][0];
    password = fields['password'][0];
    // 连接数据库 查询数据
    DB.find('productManager', 'user', {
      'username': username,
      'password': md5Node(password),
    }, (err, dataList)=>{
      if (err) {
        console.log('find err');
      }
      if (dataList.length==1) {
        // 登录成功，保存session
        req.session.userinfo = dataList[0];
        // 设置全局数据
        app.locals['userinfo']=req.session.userinfo.username;
        resp.redirect('/product/productList');
      } else {
        console.log('login err');
        resp.send('<script>location.href=\'admin/login\'</script>');
      }
    });
  });
});
router.get('/logout', (req, resp)=>{
  req.session.destroy((err)=>{
    if (err) {
      console.log(err);
    } else {
      resp.redirect('/login');
    }
  });
});
module.exports = router;

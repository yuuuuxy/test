const express = require('express');
const app = express();

// 中间件 表示匹配任何路由 应用级中间件
app.use((req, resp, next)=>{
  console.log(new Date());
  next();
});
// 应用级中间件，匹配部分路由
app.use('/news', (req, resp, next)=>{
  console.log('news middle');
  next();
});
app.use('/news', (req, resp, next)=>{
  resp.end('news');
});
app.get('/', (req, resp)=>{
  resp.send('你好啊');
});
app.set('view engine', 'ejs');/* 配置ejs模板引擎*/

app.get('/index', (req, resp)=>{
  resp.render('index', {dir: __dirname});
});
app.use(express.static('static'));// 给static目录下面的提供静态服务

// 匹配所有路由，以上匹配不到的时候使用
app.use((req, resp)=>{
  resp.status(404).send('404 error');
})
app.listen('3001');

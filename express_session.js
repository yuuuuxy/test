const express = require('express');
const app = express();
const session = require('express-session');

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10000, secure: false},
  rolling: true,
}));

app.get('/views', (req, res, next)=>{
  req.session.username = 'zs';
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>'+req.session.username)

    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end();
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!'+req.session.username);
  }
});
app.get('/logout', (req, resp)=>{
  req.session.cookie.maxAge= 0;
  resp.send('logout success');
});
app.get('/logout2', (req, resp)=>{
  req.session.destroy((err)=>{
    if (err) {
      resp.send('logout error!');
    } else {
      resp.send('logout success');
    }
  });
})
app.listen(3000);

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const url = require('url');

app.use(cookieParser('123'));
app.set('view engine', 'ejs' );
app.use(express.static('\'static\''));
app.get('/', (req, resp)=>{
  console.log(req.cookies);
  resp.render('index');
});
app.get('/city', (req, resp)=> {
  const cookiearr = req.cookies.pagesold?req.cookies.pagesold:[];
  cookiearr.push('city');
  resp.cookie('pagesold', cookiearr);
  resp.render('cityinput');
});
app.get('/pro', (req, resp)=> {
  const cookiearr = req.cookies.pagesold?req.cookies.pagesold:[];
  cookiearr.push('province');
  resp.cookie('pagesold', cookiearr);
  resp.send('province');
});
app.get('/his', (req, resp)=> {
  const cookiearr = req.cookies.pagesold?req.cookies.pagesold:[];
  cookiearr.push('his');
  resp.cookie('pagesold', cookiearr);
  resp.send('his');
});
app.get('/goCity', (req, resp)=>{
  let thiscity = url.parse(req.url, true).query.city;

  const cookiearr = req.cookies.citys?req.cookies.citys:[];
  cookiearr.push(thiscity);
  resp.cookie('citys', cookiearr);
  resp.send('u used go to'+thiscity);
});
app.listen(3000);

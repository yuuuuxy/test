const ejs = require('ejs');
const app = {
  request: function(req, resp, pathname) {
    ejs.renderFile('views/'+pathname+'.ejs', {}, (err, data)=>{
      resp.end(data);
    });
  },
  404: function(req, resp) {
    ejs.renderFile('views/404.ejs', {}, (err, data)=>{
      resp.end(data);
    });
  },
};
module.exports = app;

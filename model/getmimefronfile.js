
/* exports.getMime = function(fs, extname) {

  const data = fs.readFileSync('mime.json');
  const Mimes = JSON.parse(data.toString());
  return Mimes[extname]||'text/html';
};*/
/* 回调方法*/
/*
exports.getMime = function(fs, extname, callback) {
  fs.readFile('mime.json', (err, data)=>{
    if (err) {
      console.log('wrong:'+err);
      return false;
    }

    const Mimes = JSON.parse(data.toString());
    const result= Mimes[extname] || 'text/html';
    callback(result);
  });
};*/
/* event */
exports.getMime = function(fs, EventEmitter, extname) {
  fs.readFile('mime.json', (err, data)=> {
    if (err) {
      console.log(err);
      return false;
    }
    const Mimes = JSON.parse(data.toString());
    const result = Mimes[extname] || 'text/html';
    EventEmitter.emit('mimetype', result);
  });
}

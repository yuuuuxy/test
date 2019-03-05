const fs = require('fs');

const fileReadStream = fs.createReadStream('t1.txt');
let count=0;
let str='';
fileReadStream.on('data', (chunk) => {
  console.log(`${ ++count } 接收到: ${chunk.length}`);
  str+=chunk;
});
fileReadStream.on('end', ()=>{
  console.log('--end--');
  console.log(count);
  console.log(str);
});
fileReadStream.on('error', (err) =>{
  console.log(err);
});

/*
http.createServer(function (req,resp) {
    resp.writeHead(200,{"Content-Type":"text/html;charset:utf-8"});
    (function cons(i) {
        debugger
        if(i==5){
            return false;
        }
        resp.write(''+i);
        cons(i+1)
    })(0)
    resp.end();
}).listen(8001,'127.0.0.1')
*/
/*
fs.readdir('nodejs', ((err, files) => {
  const fileDirList=[];
  if (err) {
    console.log(err);
  } else {
    (function getFile(i) {
      if (i==files.length) {
        console.log(fileDirList);
        return false;
      }
      fs.stat('nodejs/'+files[i], (err, stats)=>{
        if (err) {
          console.log(err);
        } else if (stats.isDirectory()) {
          fileDirList.push(files[i]);
        }
        getFile(i+1);
      });
    })(0);
  }
}));*/
/*
查看是否存在upload目录 ，不存在则创建
fs.stat('upload',(err,success)=>{
    if(err){
        fs.mkdir('upload',(err1)=>{
            if(err1){
                console.log(err1);
                return false;
            }

        })
    }else {
        console.log('目录已经存在')
    }
})*/
/* fs.rename('t2.txt','t1.txt',err => {
    if(err){
        console.log(err);
        return false;
    }else{
        console.log(`success`)
    }
})*/

/* fs.readdir('node_modules',(err,data)=>{
    if(err){
        console.log(err);
        return false;
    }else{
        console.log(`${data}\n`)
    }
})*/

/*
fs.readFile('t1.txt',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`${JSON.stringify(data)}\n`);
        console.log(`${data.toString()}\n`)
    }
})
*/
/* fs.appendFile('t1.txt','qwe\n',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('create success');
})*/

/* fs.mkdir('css',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('mkdir success');
})*/

/* fs.stat('nodejs',(error,stats)=>{
    if(error){
        console.log(error);
    }else{
        console.log(stats);
        console.log(`isFile:${stats.isFile()}`)
        console.log(`isFile:${stats.isDirectory()}`)
    }
})*/

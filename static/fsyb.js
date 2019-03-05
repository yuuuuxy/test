const fs = require('fs');
const events = require('events');

const eventEmitter =new events.EventEmitter();
eventEmitter.on('datainfo', (datas)=>{
  console.log('receive success');
  console.log(datas);
});
function getMime() {
  fs.readFile('mime.json', (err, data)=>{
    eventEmitter.emit('datainfo', data);
    console.log('send success');
  });
}

getMime();


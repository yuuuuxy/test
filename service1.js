const mimeModel = require('./model/getmimefronfile');
const url = require('url');
const fs = require('fs');
console.log(mimeModel.getMime(fs, '.html'));

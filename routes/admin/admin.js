const express = require('express');
const router = express.Router();

router.get('/login', (req, resp)=>{
  resp.send('admin login');
});

module.exports = router;

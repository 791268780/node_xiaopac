const express = require('express');
const app = express();
const sql = require('./router/sql.js');

app.use(express.static('./web'))  //静态页面托管     


let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});


app.use('/sql',sql);


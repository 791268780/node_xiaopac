const mysql = require('mysql');
  //连接mysql数据库服务器
  let pool = mysql.createPool({
              host:'127.0.0.1',
              port:3306,
              user:'root',
              password:'root',
              database:'mysql',
              connectionLimit:30
            })

//导出
module.exports = pool;
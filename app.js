const express=require('express');
const bodyparser = require('body-parser');
const sql = require('./router/sql.js');
let app = express();
let serve_listen = 3001;

app.listen(serve_listen,()=>{
	console.log(`服务器创建成功  端口${serve_listen}`);
});

app.use(express.static('./web'))  //静态页面托管

app.use(bodyparser.urlencoded({   
   extended :false              //进止使用querystring查询字符串
}));

  
//路由挂载
app.use('/sql',sql);

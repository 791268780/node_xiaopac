const express=require('express');
const pool = require('../pool.js');     //引入mysql模块
const router=express.Router();       //调用express下的路由器
let html = require("../pull/index");
 

router.get('/list',(req,res)=>{ // 查询所有
 let sql = 'select * from  pull_url order by id asc';
 pool.query(sql,(err,result)=>{
	 res.send(result);                 
 })
})


router.get('/url',(req,res)=>{ // 查询所有
  let url = req.query.url;
  console.log(typeof(url));
  html.createdhtml(url,(result) => {
    if (result == '1') {
      res.send('1');
    }else{
      res.send(0);
    }
  });
 
})




module.exports = router;
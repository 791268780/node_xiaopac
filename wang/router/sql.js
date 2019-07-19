const express=require('express');
const pool = require('../../pool.js');     //引入mysql模块
const router=express.Router();       //调用express下的路由器
const superagent= require('superagent');
let fs = require("fs");

const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
const cheerio = require('cheerio');

let fill_name = ''; // 保存文件的路径
let html = '';
let shuju = [];


router.get('/list',(req,res)=>{ // 查询所有
 let sql = 'select * from  pull_url order by id asc';
 pool.query(sql,(err,result)=>{
	 res.send(result);                 
 })
})


router.get('/url',(req,res)=>{
  let url = req.query.url;
  get_shuju(url, (result) => {
    if ( result ) {
      let bool = getLocalNews(result);
      if (bool) {
        let arr = JSON.stringify(shuju);
        // console.log(shuju);
        res.send(arr);
      }
      return; 
    }
    res.send('0');
  });
 
})              

function get_fs_html(callback) { // 获取html页面
  fs.readFile(fill_name, 'UTF-8' ,function (err, data) {
    if (err) { return;}
    console.log('读取文件成功');
    html = data;
    gethtml_top('https://1680218.com/view/sgAirship/pk10kai.html','', callback);   // 获取动态数据
  });
}

function fs_html(data,callback) { // 写入文件
  let $ = cheerio.load(data); // 将网页传入对象 类似jq
      let title = $('title').text();
      fill_name = `../html/${title}.html`;
      fs.writeFile(fill_name, data, function (err) {
             if (err){
                console.log('写入失败');
                callback(0);
             } else{
                 get_fs_html(callback);
             }
       }) ;
}


function get_shuju(url, callback) {
  nightmare
  .goto(url)
  .wait('.jrsmhmtj table')
  .evaluate(() => { return document.querySelector('.jrsmhmtj table').innerHTML;} )
  .then( (htmlStr) => {
    callback(htmlStr);
  })
  .catch( (error) => {
    console.log('获取动态文件失败5');
    callback(false);
  })
}

function superagents(url, callback) {
  superagent.get('https://1680218.com/view/sgAirship/pk10kai.html').end((err, res) => { // 请求网站的  h't'm'l数据
    if (err) {
      callback(0);
    } else {
    callback(res);
    }
  });
}


let getLocalNews = (htmlStr ,callback) => {
  let $ = cheerio.load(htmlStr);
  
  shuju = htmlStr;
  console.log(trs);
  return true;
  
}




module.exports = router;
const express=require('express');
const pool = require('../../pool.js');     //引入mysql模块
const router = express.Router();       //调用express下的路由器
const superagent= require('superagent');
let fs = require("fs");

const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
const cheerio = require('cheerio');

let fill_name = ''; // 保存文件的路径
let html = ''; // 存 静态页面  没有动态数据
let shuju = [];


router.get('/list',(req,res)=>{ // 查询所有
 let sql = 'select * from  pull_url order by id asc';
 pool.query(sql,(err,result)=>{
	 res.send(result);                 
 })
})


router.get('/url',(req,res)=>{
  let url = req.query.url;

   superagents(url, (bool) => { // 请求html静态页面
      if (bool) { 
        fs_html(html, (bool) => {
          if (bool) {
            get_fs_html((bool) => {
              if (bool) {
                get_shuju(url, (bool) => {
                  if (bool) {
                    let data = get_data(shuju);
                    let ste = JSON.stringify(data);
                    res.send(ste);
                  }
                  res.send('0');  
                });
              }
            });
          }
        });
      }
   }) 
})              



function get_fs_html(callback) { // 获取html页面
  fs.readFile(fill_name, 'UTF-8' ,function (err, data) {
    if (err) { return;}
    console.log('读取静态文件成功');
    html = data;
    callback(true);
  });
}

function fs_html(data, callback) { // 写入文件
  let $ = cheerio.load(data.text); // 将网页传入对象 类似jq
      let title = $('title').text();
      // console.log(title);
      fill_name = `../html/${title}.html`;
      fs.writeFile(fill_name, data, function (err) {
             if (err){
                console.log('写入失败');
             } else{
                 console.log('写入成功');
                callback(true);
             }
       }) ;
}


function get_shuju(url, callback) {
  nightmare
  .goto(url)
  .wait('.jrsmhmtj table')
  .evaluate( () => {return document.querySelector('.jrsmhmtj table').innerHTML;} )
  .then( (htmlStr) => {
    console.log('获取动态文件成功');
    shuju = htmlStr;
    callback(true);
    return;
  })
  .catch( (error) => {
    console.log('获取动态文件失败');
  })
}

function get_data(data) {
  // console.log(data);
  let $ = cheerio.load('<h2><h1>421</h1></h2>'); // 将网页传入对象 类似jq
  let shuju = [];
  let trs = $('h2').children('h1').text();
  console.log(trs);
    //   trs.each((i, item) => {
    //   if (i == 0) { return; }
    //   let obj = {};
    //   obj['preDrawCode'] = [];
    //   obj['preDrawIssue'] = $(item).children()[1];
    //   obj['preDrawIssue'] = $(obj['preDrawIssue']).html();
    //   obj['preDrawTime'] = $(item).children()[0];
    //   obj['preDrawTime'] = $(obj['preDrawTime']).html();
    //   let numbers = $(item).children()[2];
    //   let numbers1 = $(numbers).children()[0];
    //   let numbers2 = $(numbers1).children();
    //   numbers2.each( (i, item) => {
    //     let it = $(item).children()[0];
    //     obj['preDrawCode'].push( $(it).html() );
    //   } )
    //   shuju.push(obj);
    // })
    // console.log(shuju);
    return data;
  }

function superagents(url, callback) {
  bool = false;
  superagent.get(url).end((err, res) => { // 请求网站的  h't'm'l数据
    if (err) {
      console.log('静态页面拉取失败');
    } else {
      console.log('静态页面拉取成功');
      html = res;
      callback(true);
    }
  });
}






module.exports = router;
let cheerio = require("cheerio");
let server = require("./curl.js");
let fs = require("fs");
 
function createdhtml(url, callback) { //  这段代码可以下载任意一个网页的内容
  server.download(url, function(data) {
    if (data) { // 爬取到的网页 html 代码
      let $ = cheerio.load(data); // 将网页传入对象 类似jq
      let title = $('title').text();
      fs.writeFile(`./html/${title}.html`,data,function (err) {
             if (err){
                console.log('写入失败');
             } else{
                console.log('写入成功');
                callback(1);
             }
       }) ;
      // console.log(data)
    } else {
      callback(0);
    } 
  });
}

exports.createdhtml = createdhtml;





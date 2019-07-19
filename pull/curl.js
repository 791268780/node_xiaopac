let http = require("http");
let https = require("https");
 
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) { //  这段代码可以下载任意一个网页的内容
  let ht = url.split(':')[0];
  if (ht == 'https') {
    https.get(url, function(res) {
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
    }).on("error", function() {
      callback(null);
    });
  }else{
    http.get(url, function(res) {
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
    }).on("error", function() {
      callback(null);
    });
  }
  
}

exports.download = download;
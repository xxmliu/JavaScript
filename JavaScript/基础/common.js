// 需求:
// get(地址, 回调函数)
// callback:回调; 简写: cb
function get(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.onload = function () { 
    let data = JSON.parse(xhr.response);

    cb(data)    // 传到回调函数中
  }
  xhr.send();
}
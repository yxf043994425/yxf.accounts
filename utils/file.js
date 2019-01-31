var fs = require("fs");

/**
 * 读取文件
 * @param {*} path 
 * @param {*} call 
 */
export const ReadFile = (path, call) => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    call(data);
  });
}

/**
 * 写入文件
 * @param {*} path 
 * @param {*} data 
 * @param {*} call 
 */
export const WriteFile = (path, data, call) => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    call(data);
  });
}
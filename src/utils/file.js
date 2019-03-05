const fs = require("fs");

/**
 * 读取文件
 * @param {*} path 
 * @param {*} call 
 */
exports.ReadFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  })
}

/**
 * 写入文件
 * @param {*} path 
 * @param {*} data 
 * @param {*} call 
 */
exports.WriteFile = (path, data) => {
  return new Promise((resolve, reject) => {
    let content = data;
    if (typeof(content) !== 'string') {
      content = JSON.stringify(content);
    }
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve(data);
    });
  })
}

/**
 * 检测文件
 * @param {*} path 
 */
exports.CheckFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) reject(err);
      resolve();
    });
  })
}
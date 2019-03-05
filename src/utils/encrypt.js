var CryptoJS = require("crypto-js");

/**
 * AES解密
 * @param {*} content 
 * @param {*} key 
 */
exports.DecryptAES = (content, key) => {
  var bytes = CryptoJS.AES.decrypt(content, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * AES加密
 * @param {*} content 
 * @param {*} key 
 */
exports.EncryptAES = (content, key) => {
  return CryptoJS.AES.encrypt(content, key).toString();
}

/**
 * MD5哈希算法
 * @param {*} value 
 */
exports.HashMD5 = (value) => {
  return CryptoJS.MD5(value);
}
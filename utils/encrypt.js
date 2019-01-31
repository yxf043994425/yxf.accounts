var CryptoJS = require("crypto-js");

/**
 * AES解密
 * @param {*} content 
 * @param {*} key 
 */
export const DecryptAES = (content, key) => {
  var bytes = CryptoJS.AES.decrypt(content, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
/**
 * AES加密
 * @param {*} content 
 * @param {*} key 
 */
export const EncryptAES = (content, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(content), key).toString();
}

/**
 * MD5哈希算法
 * @param {*} value 
 */
export const HashMD5 = (value) => {
  return CryptoJS.MD5(value);
}
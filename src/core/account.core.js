const FILE = require('../utils/file');
const ENCRYPT = require('../utils/encrypt');
const ERR = require('../config/err.conf');

let _key;
let _user;
let _current;

function SaveAccountKey(key) {
  if (!key) {
    return false;
  }
  _key = key;
  return true;
}

function GetAccountKey() {
  if (!_key) {
    return null;
  }
  return _key;
}

function EncryptFile(content) {
  if (typeof (content) !== 'string') {
    content = JSON.stringify(content);
  }
  return ENCRYPT.EncryptAES(content, GetAccountKey());
}

function DecryptFile(content) {
  if (typeof (content) !== 'string') {
    content = JSON.stringify(content);
  }
  return ENCRYPT.DecryptAES(content, GetAccountKey());
}

/**
 * 根据缓存key获取用户文件路径
 * @returns
 */
function GetAccountPath() {
  if (!_key) {
    throw new Error(ERR.ERR_CODE.ERR_NO_KEY);
  }
  return `${global.env.src}/${ENCRYPT.HashMD5(_key)}`;
}

exports.Login = function (password) {
  return new Promise((resolve, reject) => {
    if (SaveAccountKey(password)) {
      FILE.ReadFile(GetAccountPath()).then(data => resolve(data)).catch(err => reject(new Error(ERR.ERR_CODE.ERR_NO_FILE)));
    } else {
      reject(new Error(ERR.ERR_CODE.ERR_NO_ACCOUNT));
    }
  })
}

exports.Register = function () {
  return new Promise((resolve, reject) => {
    _user = {
      name: _key
    };
    FILE.WriteFile(GetAccountPath(), EncryptFile(_user)).then(data => resolve(data)).catch(err => reject(err));
  })
}
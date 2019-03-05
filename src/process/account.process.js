const readline = require('readline');
const command = require('../utils/command');
const file = require('../utils/file');
const encrypt = require('../utils/encrypt');
const message = require('../utils/message');
const ERR = require('../config/err.conf');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let _key;

/**
 * 保存用户KEY
 * @param {*} key
 * @returns
 */
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

/**
 * 根据缓存key获取用户文件路径
 * @returns
 */
function GetAccountPath() {
  if (!_key) {
    throw new Error(ERR.ERR_CODE.ERR_NO_KEY);
  }
  return `${global.env.src}/${encrypt.HashMD5(_key)}`;
}

function EncryptFile(content) {
  let file = content;
  if (typeof (file) !== 'string') {
    content = JSON.stringify(file);
  }
  return encrypt.EncryptAES(file, GetAccountKey());
}

function DecryptFile(content) {
  let file = content;
  if (typeof (file) !== 'string') {
    content = JSON.stringify(file);
  }
  return encrypt.DecryptAES(file, GetAccountKey());
}

/**
 * 询问用户密码
 * @returns
 */
function QuestionLogin() {
  return new Promise((resolve, reject) => {
    rl.question('输入登录密码:', (answer) => {
      if (SaveAccountKey(answer)) {
        file.ReadFile(GetAccountPath()).then(data => resolve(data)).catch(err => reject(new Error(ERR.ERR_CODE.ERR_NO_FILE)));
      } else {
        reject(new Error(ERR.ERR_CODE.ERR_NO_ACCOUNT));
      }
    });
  })
}

/**
 * 询问新用户是否创建文件
 * @returns
 */
function QuestionFile() {
  return new Promise((resolve, reject) => {
    rl.question('是否创建用户(Y/N):', (answer) => {
      switch (answer.toUpperCase()) {
        case 'Y':
          const model = {
            name: 'account'
          };
          file.WriteFile(GetAccountPath(), EncryptFile(model)).then(data => resolve(data)).catch(err => reject(err));
          break;
        case 'N':
        default:
          rl.close();
          break;
      }
    });
  })
}

function CommandQuestion(model) {
  rl.question(
    `
  请选择命令:
  1.show: 显示所有信息。
  2.add: 添加账号。
  3.exit: 退出。
`, (answer) => {
      switch (answer.toUpperCase()) {
        case 'SHOW':
          message.ShowModel(model);
          CommandQuestion(model);
          break;
        case 'ADD':
          rl.question(``, (answer) => {

          })
          break;
        case 'EXIT':
        default:
          rl.close();
          break;
      }
    })
}

function Command(data) {
  let model = JSON.parse(DecryptFile(data.toString()));
  CommandQuestion(model);
}

function CommandErr(err) {
  message.ShowError(err);
  if (rl) {
    rl.close();
  }
}

exports.run = async function () {
  command.CommandQuestion('account-account').then(data => {
    console.log('account-run', data);
  })
  // await QuestionLogin().then((data) => {
  //   Command(data);
  // }).catch(async (err) => {
  //   switch (Number(err.message)) {
  //     case ERR.ERR_CODE.ERR_NO_ACCOUNT:
  //     case ERR.ERR_CODE.ERR_NO_KEY:
  //       CommandErr(err);
  //       return;
  //     case ERR.ERR_CODE.ERR_NO_FILE:
  //     default:
  //       break;
  //   }
  //   QuestionFile().then(data => {
  //     Command(data);
  //   }).catch(err => CommandErr(err));
  // });
}
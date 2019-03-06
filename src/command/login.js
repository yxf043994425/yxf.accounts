const COMMAND = require('../utils/command');
const ACCOUNT = require('../core/account.core');

exports.run = function (arg) {
  return new Promise((resolve, reject) => {
    COMMAND.CommandQuestion('请输入密码:').then(answer => {
      ACCOUNT.Login(answer).then(res => {
        resolve();
      }).catch(err => {
        resolve('register');
      });
    })
  })
}
const COMMAND = require('../utils/command');
const ACCOUNT = require('../core/account.core');

exports.run = function (arg) {
  return new Promise((resolve, reject) => {
    COMMAND.CommandQuestion('是否创建用户(Y/N):').then(answer => {
      switch (answer.toUpperCase()) {
        case 'Y':
          ACCOUNT.Register().then(res => {
            resolve();
          });
          break;
        case 'N':
        default:
          COMMAND.CommandExit();
          break;
      }
    }).catch(err => {
      COMMAND.CommandErr(err);
    });
  })
}
const COMMAND = require('../utils/command');
const ACCOUNT = require('../core/account.core');

exports.run = function (arg) {
  return new Promise((resolve, reject) => {
    ACCOUNT.SaveUser()
      .then(res => resolve())
      .catch(err => COMMAND.CommandErr(err));
  })
}
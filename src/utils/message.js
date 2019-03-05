const ERR = require('../config/err.conf');

/**
 * 显示信息
 */
exports.ShowMessage = (message, opts) => {
  console.log(message);
}

exports.ShowModel = (model) => {
  for (const key in model) {
    switch (typeof (model[key])) {
      case 'object':
        this.ShowModel(model[key], key);
        break;
      case 'string':
        this.ShowMessage(`${key}: ${model[key]}`);
        break;
    }
  }
}

/**
 * 显示异常信息
 */
exports.ShowError = (err, opts) => {
  if (err && err.message && ERR.ERR_MESSAGE[err.message]) {
    this.ShowMessage(ERR.ERR_MESSAGE[err.message]);
  } else {
    this.ShowMessage(err);
  }
}
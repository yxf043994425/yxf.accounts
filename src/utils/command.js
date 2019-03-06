const readline = require('readline');
const message = require('../utils/message');
const ERR = require('../config/err.conf');

let rl;
let commanding = false;

function GetReadLine() {
  if (rl) {
    return rl;
  } else {
    return rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
}

exports.CommandErr = (err) => {
  message.ShowError(err);
  this.CommandExit();
}

exports.CommandExit = () =>{
  if (rl) {
    rl.close();
  }
}

exports.CommandQuestion = (msg) => {
  return new Promise((resolve, reject) => {
    if (!commanding) {
      commanding = true;
      GetReadLine().question(msg, (answer) => {
        commanding = false;
        resolve(answer);
      })
    } else {
      reject(ERR.ERR_SYS);
    }
  })
}
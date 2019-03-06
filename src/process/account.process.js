const COMMAND = require('../utils/command');
const MESSAGE = require('../utils/message');
const ERR = require('../config/err.conf');

const _path = '../command'

const _commands = {
  ADD: { file: 'add.js'},
  LIST: { file: 'list.js'},
  LOGIN: { file: 'login.js'},
  REGISTER: {file: 'register.js'},
  REMOVE: { file: 'remove.js'},
}

function Commanding(command) {
  if (command) {
    CommandExecute(command);
  } else {
    COMMAND.CommandQuestion('>').then(data => {
      CommandExecute(data);
    })
  }
}

function CommandExecute(command) {
  if (command) {
    const result = command.split(' ');
    const name = result[0].toUpperCase();
    const args = result.splice(1);
    switch (name) {
      case 'EXIT':
        COMMAND.CommandExit();
        break;
      default:
        if (_commands[name]) {
          require(`${_path}/${_commands[name].file}`).run(args).then((res) => {
            Commanding(res);
          });
        } else {
          COMMAND.CommandExit();
        }
        break;
    }
  } else {
    Commanding();
  }
}

exports.run = function () {
  Commanding('login');
}
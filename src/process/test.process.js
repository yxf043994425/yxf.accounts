const command = require('../utils/command');

exports.run = function () {
  command.CommandQuestion('test-test').then(data => {
    console.log('test-run', data);
  })
}
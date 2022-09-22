const chalk = require("chalk");

function log(chalkMsg, addTimeStamp) {
  var str = chalk`${chalkMsg}`;
  if (addTimeStamp) {
    var time = new Date().toLocaleTimeString();
    str += chalk` {rgb(128,128,128).bold [${time}]}`;
  }
  return str;
}

module.exports = {
  logExpress: function (string, addTimeStamp) {
    var str = chalk`{rgb(255,255,255).bold.bgBlack [EXPRESS]} {white ${string}}`;
    console.log(chalk`${log(str, addTimeStamp)}`);
  },
  logDB: function (string, addTimeStamp) {
    var str = chalk`{green.bold [DB]} {white ${string}}`;
    console.log(chalk`${log(str, addTimeStamp)}`);
  },
  logGame: function (string, addTimeStamp) {
    var str = chalk`{blue.bold [GAME]} {white ${string}}`;
    console.log(chalk`${log(str, addTimeStamp)}`);
  },
  logError: function (string, addTimeStamp) {
    var str = chalk`{red.bold [ERROR]} {white ${string}}`;
    console.log(chalk`${log(str, addTimeStamp)}`);
  },
};

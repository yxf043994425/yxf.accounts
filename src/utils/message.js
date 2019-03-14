const ERR = require('../config/err.conf');

const ANSI_CODE = {
  ANSI_CLOSE_ALL: '\033[0m', // 关闭所有属性
  ANSI_SET_LIGHT: '\033[1m', // 设置高亮
  ANSI_UNDERLINE: '\033[4m', // 下划线
  ANSI_FLICKER: '\033[4m', // 闪烁
  ANSI_SIGNIFICANT: '\033[7m', // 返显
  ANSI_BLANKING: '\033[8m', // 消隐
  ANSI_FONT_BLACK: '\033[30m', // 黑色字体
  ANSI_FONT_RED: '\033[31m', // 红色字体
  ANSI_FONT_GREEN: '\033[32m', // 绿色字体
  ANSI_FONT_YELLOW: '\033[33m', // 黄色字体
  ANSI_FONT_BLUE: '\033[34m', // 蓝色字体
  ANSI_FONT_PURPLE: '\033[35m', // 紫色字体
  ANSI_FONT_DARK_GREEN: '\033[36m', // 深绿色字体
  ANSI_FONT_WHITE: '\033[37m', // 白色字体
  ANSI_BACK_BLACK: '\033[40m', // 黑色背景
  ANSI_BACK_DARK_RED: '\033[41m', // 深红色背景
  ANSI_BACK_GREEN: '\033[42m', // 绿色背景
  ANSI_BACK_YELLOW: '\033[43m', // 黄色背景
  ANSI_BACK_BLUE: '\033[44m', // 蓝色背景
  ANSI_BACK_PURPLE: '\033[45m', // 紫色背景
  ANSI_BACK_DARK_GREEN: '\033[46m', // 深绿色背景
  ANSI_BACK_WHITE: '\033[47m', // 白色背景
  ANSI_CURSOR_UP: '\033[nA', // 光标上移N行
  ANSI_CURSOR_DOWN: '\033[nB', // 光标下移N行
  ANSI_CURSOR_RIGHT: '\033[nC', // 光标右移N行
  ANSI_CURSOR_LEFT: '\033[nD', // 光标左移N行
  ANSI_CURSOR_POS: '\033[y;xH', // 设置光标位置（y列x行）
  ANSI_CLEAR: '\033[2J', // 清屏
  ANSI_CLEAR_REMAIN: '\033[K', // 清除从光标到行尾的内容
  ANSI_CURSOR_SAVE: '\033[s', // 保存光标位置
  ANSI_CURSOR_RESTORE: '\033[u', // 恢复光标位置
  ANSI_CURSOR_HIDE: '\033[?25l', // 隐藏光标
  ANSI_CURSOR_SHOW: '\033[?25h', // 显示光标
}

/** 
 * 循环显示彩色文字内容 
*/
exports.TestMessageColor = () => {
  for (let j = 40; j <= 47; j++) {
    for (let i = 30; i <= 37; i++) {
      console.log(`${'\033[' + i +'m'}${'\033[' + j +'m'}${Math.random()}${ANSI_CODE.ANSI_CLOSE_ALL}`);
    }
  }
}

/**
 * 显示信息
 */
exports.ShowMessage = (message, opts) => {
  console.info(`${message}${ANSI_CODE.ANSI_CLOSE_ALL}`);
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
    console.error(`${ANSI_CODE.ANSI_FONT_RED}${ERR.ERR_MESSAGE[err.message]}${ANSI_CODE.ANSI_CLOSE_ALL}`);
  } else {
    console.error(`${ANSI_CODE.ANSI_FONT_RED}${err}${ANSI_CODE.ANSI_CLOSE_ALL}`);
  }
}
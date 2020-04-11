/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-09 14:05:49
 */
// 防抖
// function debounce(fn, time) {
//   console.log("debounce");

//   let _arguments = arguments;
//   let timeout = null;
//   return function() {
//     console.log("debounce in ");

//     if (timeout) {
//       console.log("clearTimeout");
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       console.log("gogo");
//       fn.call(this, _arguments);
//     }, time);
//   };
// }

/*
 *  description: 在vue中使用的防抖函数
 *  param fnName {String}  函数名
 *  param time {Number}    延迟事件
 *  return: 处理后的执行函数
 */
function VueDebounce(fnName, time) {
  let timeout = null;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fnName]();
    }, time);
  };
}

function Debounce(fn, time) {
  console.log("debounce");

  let timeout = null;
  return function() {
    console.log("debounce in ");

    if (timeout) {
      console.log("clearTimeout");
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      console.log("gogo");
      fn();
    }, time);
  };
}

// 节流
function throttle(fn, time) {
  let _arguments = arguments;
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.call(this, _arguments);
      canRun = true;
    }, time);
  };
}

// 节流
function VueThrottle(fn, time) {
  let _arguments = arguments;
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.call(this, _arguments);
      canRun = true;
    }, time);
  };
}

export { throttle, VueDebounce, Debounce, VueThrottle };

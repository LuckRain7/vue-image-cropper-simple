/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-09 14:05:49
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

// base64 to Blob

function base64ToBlob(BASE64) {
  BASE64 = BASE64.split(",")[1];
  BASE64 = window.atob(BASE64);
  let DATA = new Uint8Array(BASE64.length);
  for (let i = 0; i < BASE64.length; i++) {
    DATA[i] = BASE64.charCodeAt(i);
  }

  // headerUploadPath
  let NewBlob = new Blob([DATA], { type: "image/png" });
  return NewBlob;
}

export { VueDebounce, VueThrottle, base64ToBlob };

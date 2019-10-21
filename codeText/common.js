/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
function formatDate(time, fmt) {
    if (time === undefined || '') {
      return
    }
    const date = new Date(time)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }
    return fmt
  }
  
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/*
* 隐藏用户手机号中间四位
*/
function hidePhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}


/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}


/**
 * 时间转化显示
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
  

/**
 * 数据深拷贝
 * @param {Object} obj
 * @param {Fn} hash
 * @returns {Object}
 */

function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') {
    //如果不是复杂数据类型，直接返回
    return obj
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  /**
   * 如果obj是数组， 那么 obj.constructor 是 [Function: Array]
   * 如果obj是对象， 那么 obj.constructor 是 [Function: Object]
   */

   let t = new obj.constructor();
   hash.set(obj, t);
   for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], hash);
     }
   }
   return t;
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 库是在dedecmsv57utf8sp2
module.exports = {
  formatTime: formatTime,
  apiUrl:"https://www.bslxx.com/public/xcxapi/",
  yjUrl:"https://yj.useoce.cn/meet/"
}

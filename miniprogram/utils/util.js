// util.js

// 获取年月多项选择框的数据
function getYearMonthData() {
  let yearArr = []
  let monthArr = []
  for (let mon = 1; mon <= 12; mon++) {
    let year = mon + 2017
    let monStr = mon < 10 ? `0${mon}` : mon
    yearArr.push(`${year}年`)
    monthArr.push(`${monStr}月`)
  }
  this.setData({
    yearMonthArr: [
      yearArr,
      monthArr
    ]
  })
}


// 获取当前年月日，更新页面数据
function getCurDate() {
  let curTime = new Date()
  let year = curTime.getFullYear()
  let mon = curTime.getMonth() + 1
  let date = curTime.getDate()
  mon = mon < 10 ? `0${mon}` : `${mon}`
  date = date < 10 ? `0${date}` : `${date}`
  this.data.today = [`${year}`, mon, date]
  console.log(this.data.today)

  // 设置年月选择框默认值, 选择框 年从2018开始，月从01开始
  let yearIndex = year - 2018;
  let monIndex = mon - 1;
  let tempDate = [`${year}`, mon, date]
  
  this.setData({
    yearMonthIndex: [yearIndex, monIndex],
    curDate: date,
    today: tempDate,
    curDay: tempDate, // 以下两个参数是为了在前端比对字符串时用
    curDayStr: tempDate.join('-'),
    todayStr: tempDate.join('-')
  })
}


// 获取当前年，当前月份的date list
function getMonDateList(year, mon) {
  console.log(year, mon)
  // 先算当月有多少天
  let len = 30 // 默认小月
  let largeMon = [1, 3, 5, 7, 8, 10, 12];

  if (mon === "02") {
    // 如果是二月的情况
    year = parseInt(year)
    let isLeapyear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
    len = isLeapyear ? 29 : 28
  } else if (largeMon.includes(parseInt(mon))){
    // 如果是大月的情况
    len = 31
  } 

  // 确定当前月天数为len后，创建数组
  let tempArr = []
  for (let i = 1; i <= len; i++) {
    let val = i < 10 ? `0${i}` : `${i}` // 当前天
    let dateSatus = 'normal' // 当天的状态  
    let isCurdate = false // 是否是当天

    if (this.data.today[2] === val) {
      isCurdate = true
    }
    // 测试数据
    // let random = Math.round(Math.random() * 2)
    // dateSatus = this.data.statusArr[random].content
    // console.log(dateSatus)
    tempArr.push({ val, isCurdate, dateSatus })
  }
  // tempArr[5].isCurdate = true
  this.setData({
    dateArr: tempArr
  })
}


module.exports = {
  getYearMonthData,
  getCurDate,
  getMonDateList
}
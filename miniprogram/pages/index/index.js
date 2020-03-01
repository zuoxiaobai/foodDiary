// miniprogram/pages/index/index.js

const { historyData } = require('../../mockdata/mockdata.js')
const { getYearMonthData, getCurDate, getMonDateList} = require('../../utils/util.js')
const { server_loginAndGetHistory, server_getHistoryData} = require('../../server/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: [], // 今日时间 ['2019', '08','14'] 
    todayStr: '',

    yearMonthArr: [], // 年月选择器List
    dateArr: [], // 日期数组
    statusArr: [ 
      { content: 'normal', text: '一般' }, 
      { content: 'good', text: '很好' }, 
      { content: 'bad', text: '难受' }, 
    ],

    curStatus: 0, // 当前状态
    curDate: 5, // 当前选择 日
    curDay: [], // 当前[年, 月, 日]
    curDayStr: '',
    yearMonthIndex: [0, 11], // 年月选择器，选择的年月 [0, 2]
    scrollPosition: 'curday-sec-14', // '滚动位置'

    history: [], 
    showTips: true
    // history: historyData // 测试数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取年月选择器数据
    getYearMonthData.call(this, null)

    // 获取当前 年 月 日，并设置到 this.data.today
    getCurDate.call(this, null)

    // 根据年、月，获取当前的日期list，并设置到dateArr
    getMonDateList.apply(this, this.data.today)

    // 滑动到当前天
    setTimeout(()=> {
      this.setData({
        scrollPosition: `curday-sec-${this.data.today[2]}`
      })
    }, 0)

    // login 并获取当天的数据
    server_loginAndGetHistory.call(this, app)

    // {
    //   date: "2019-08-14"
    //   foodAndCount: "哈密瓜半个"
    //   openid: "ocH374oiaXHKXoQxDX6Pfs77mLBs"
    //   symptomAndRemark: "暂无"
    //   time: "21:31"
    //   _id: "890198e15d540d2a1427d41c3998fab9"
    // }
  },

  // 年月选择框值改变
  yearMonthChange(event) {
    let yearMonthIndex = event.detail.value
    this.setData({
      yearMonthIndex: event.detail.value
    })

    // 原来的月份天数
    let oriMonthDayCount = this.data.dateArr.length

    // 切换日期list
    let dateArr = [
      this.data.yearMonthArr[0][yearMonthIndex[0]].split('年')[0],
      this.data.yearMonthArr[1][yearMonthIndex[1]].split('月')[0]
    ]
    getMonDateList.apply(this, dateArr)

    // 现在的月份天数
    let curMonthDayCount = this.data.dateArr.length

    // 这里注意，如果 1/31 切到 2月，默认为 2/31，会有异常，如果天数过小，切换到最大天数
    // 如果当前天数游标，大于切换后月份天数最后一天
    if (this.data.curDate > curMonthDayCount) {
      console.log('月份天数超过最大值，使用当前天数最大值')

      this.setData({
        curDate: curMonthDayCount
      })
    }

    // 刷新数据
    this.refreshData()
  },

  // 状态改变
  bindStatusChange(e) {
    this.setData({
      curStatus: e.detail.value
    })
  },

  // 某一天被点中
  clickDate(e) {
    // 获取当前天，清除原来选中，设置新选中，设置新的curDate
    let curDate = e.currentTarget.id.split("curday-sec-")[1]
    console.log(curDate) // 01 ---- 31
    this.setData({
      curDate: curDate
    })
    this.refreshData()
  },

  // 某一条历史记录被点击
  historySecClick(e) {
    let index = e.currentTarget.id.split("-")[1]
    let curInfo = this.data.history[index]
    wx.showModal({
      title: '您是否要修改该记录？',
      // confirmText: "修改",
      content: 
      `时间：${curInfo.time}
       食物及数量：${curInfo.foodAndCount} 
       症状或备注：${curInfo.symptomAndRemark}`,
      success:(res) => {
        if (res.confirm) {
          // 进入修改页面
          wx.navigateTo({
            url: `/pages/addHistory/addHistory?isEdit=true&curDay=${encodeURIComponent(this.data.curDayStr)}&curInfo=${encodeURIComponent(JSON.stringify(curInfo))}`,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      } 
    })
  },

  // 添加记录
  addHistory() {
    let curDay = this.data.curDayStr
    wx.navigateTo({
      url: `/pages/addHistory/addHistory?curDay=${encodeURIComponent(curDay)}`,
    })
  },

  // 刷新数据
  refreshData(isNotAllowCache) {
    // 数据处理
    let curYear = this.data.yearMonthArr[0][this.data.yearMonthIndex[0]].split('年')[0]
    let curMon = this.data.yearMonthArr[1][this.data.yearMonthIndex[1]].split('月')[0]
    let curDay = [curYear, curMon, this.data.curDate]
    this.setData({
      curDay: curDay,
      curDayStr: curDay.join('-')
    })
    server_getHistoryData.call(this, curDay, app.globalData.openid, isNotAllowCache)
  },

  // 回到今天
  returnToday(e) {
    let today = this.data.today
    let yearIndex = today[0] - 2018;
    let monIndex = today[1] - 1;

    this.setData({
      yearMonthIndex: [yearIndex, monIndex],
      curDate: today[2],
      curDay: today,
      curDayStr: today.join('-')
    }) 

    // 切换日期list
    let dateArr = [
      this.data.yearMonthArr[0][yearIndex].split('年')[0],
      this.data.yearMonthArr[1][monIndex].split('月')[0]
    ]
    getMonDateList.apply(this, dateArr)

    server_getHistoryData.call(this, this.data.today, app.globalData.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let mark = app.globalData.tempArr.pop()
    console.log('onshow mark', mark)
    if (typeof mark !== 'undefined') {
      this.refreshData(true)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log('下拉事件')
    let isNotAllowCache = true
    server_getHistoryData.call(this, this.data.curDay, app.globalData.openid, isNotAllowCache, ()=> {
      // 获取数据完成后
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: 'IBD饮食日记',
      path: '/pages/index/index',
      imageUrl: '/images/share.png',
    }
  }
})
// miniprogram/pages/addHistory/addHistory.js

const { server_addHistoryData, server_editHistoryData, server_deleteHistoryData } = require('../../server/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    curDay: [], // ["2019", "08", "04"]
    isEdit: false,
    curInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    let date = new Date()
    let hour = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()
    let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

    // 获取当前年月日
    let curDay = decodeURIComponent(options.curDay).split('-')
    console.log(curDay)
    
    let needSetData = {
      time: `${hour}:${min}`,
      curDay: curDay,
      isEdit: options.isEdit === 'true'
    }

    // 如果是修改，获取对应的数据
    if (options.isEdit === 'true') {
      let curInfo = JSON.parse(decodeURIComponent(options.curInfo))
      Object.assign(needSetData, {
        curInfo,
        time: curInfo.time
      })
    }

    this.setData(needSetData)
  },

  // 表单提交
  formSubmit(e) {
    let formData = e.detail.value
    console.log('表单提交', formData)
    // 要加trim() 不然空格内容也会提交成功
    if (formData.foodAndCount.trim() === "" && formData.symptomAndRemark.trim() === "") {
      wx.showToast({
        title: '食物及数量和症状及备注要至少填一项',
        icon: 'none'
      })
      return;
    } 

    // 由于都是用的同一个处理函数，需要处理下
    let opt = e.detail.target.id 
    console.log(opt)
    if (opt === 'add-opt') {
      // 新增数据
      server_addHistoryData.call(this, this.data.curDay, app.globalData.openid, formData, app)
    } else {
      // 修改数据
      let { _id, openid } = this.data.curInfo
      server_editHistoryData.call(this, _id, openid, formData, app)
    }
  },

  // 取消
  formCancel(e) {
    wx.navigateBack()
  },

  // 时间改变
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

  // 删除记录
  deleteHistory() {
    wx.showModal({
      title: '系统提示',
      content: '您确定要删除该记录？',
      success: (res) => {
        if (res.confirm) {
          console.log(this.data.curInfo._id, app.globalData.appid)
          // 确定删除
          let { _id, openid } = this.data.curInfo
          server_deleteHistoryData.call(this, _id, openid, app)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  onPullDownRefresh: function () {

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
      title: 'IBD健康管理',
      path: '/pages/index/index',
      imageUrl: '/images/share.png',
    }
  }
})
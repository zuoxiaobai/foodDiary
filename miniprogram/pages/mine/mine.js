// miniprogram/pages/mine/mine.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
  },

  // 关于IBD饮食日记
  aboutmp() {
    console.log('aboutmp')
    wx.navigateTo({
      url: "/pages/about/about"
    })
  },

  github() {
    wx.showModal({
      title: '关于开源',
      content: '本小程序代码已完全开源在Github，欢迎Star、提issue。地址：https://github.com/zuoxiaobai/foodDiary',
      showCancel: false,
      confirmText: '复制地址',
      success() {
        wx.setClipboardData({
          data: 'https://github.com/zuoxiaobai/foodDiary',
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log(res.data) // data
              }
            })
          }
        })
      }
    })
  },

  contact() {
    wx.navigateTo({
      url: '/pages/contact/contact',
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
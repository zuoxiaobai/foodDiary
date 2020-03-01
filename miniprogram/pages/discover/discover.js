// miniprogram/pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 添加到我的小程序
  addToMyMp() {
    wx.navigateTo({
      url: '/pages/addToMyMp/addToMyMp',
    })
  },

  // IBD类克用药
  toIBDLK() {
    wx.navigateToMiniProgram({
      appId: 'wx45333c9fc02af773',
    })
  },

  // 类克计算器
  toLKCalc() {
    wx.showToast({
      title: '类克计算器',
      icon: "none"
    })
  },

  // 食物不耐受
  foodIgG() {
    wx.showToast({
      title: '食物特异性检测',
      icon: "none"
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
  onShareAppMessage: function () {

  }
})
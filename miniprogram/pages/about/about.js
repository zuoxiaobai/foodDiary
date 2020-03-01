// miniprogram/pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version: '1.2.0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 菜单链接点击事件
  clickFunc(e) {
    switch(e.currentTarget.id) {
      case 'func-intro':
        // 进入功能介绍页
        wx.navigateTo({
          url: '/pages/funcIntro/funcIntro',
        })
        break;
      case 'check-new-ver':
        // 开始检测新版本
        this.checkNewVersion()
        break;
    }
  },

  // 检查新版本
  checkNewVersion() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
      wx.showToast({
        icon: "none",
        title: res.hasUpdate ? '检测到新版本，请稍等' : '当前已是最新版本',
      })
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
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
      title: 'IBD饮食日记',
      path: '/pages/index/index',
      imageUrl: '/images/share.png',
    }
  }
})
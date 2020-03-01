// miniprogram/pages/funcIntro/funcIntro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verType: {
      'A': '新增',
      'U': '更新',
      'F': '修复',
      'O': '优化'
    },
    updateInfo: [
      {
        version: '1.2.0',
        date: '2020-03-01 17:35',
        detailArr: [
          {
            type: 'A',
            text: '发现入口，可链接到 "IBD类克用药" 小程序，预留类克计算器，食物耐受页面入口'
          },
          {
            type: 'A',
            text: '添加到我的小程序操作指引，新增github开源地址，联系作者页面'
          },
          {
            type: 'F',
            text: '所有的月份只到29号,有的月份30和31号没办法记录的问题; 修复分享时的文案错误；更新年份选择器从2018年到当前年份'
          }
        ]
      },
      {
        version: '1.1.0',
        date: '2019-08-16 21:35',
        detailArr: [
          {
            type: 'A',
            text: 'iPad UI适配，将字体rpx以及固定高度rpx改为px，优化大屏显示效果。iphone 5显示优化'
          },
          {
            type: 'A',
            text: `下拉刷新，弥补多端同步时，一端已缓存数据，另一端当天数据变更后，缓存的一端不会实时刷新的不足。`
          },
          {
            type: 'A',
            text: `网络异常提示，当检测没网络时，提示异常，但如果连接了wifi，wifi也没网的情况是无法检测的，只能等超时提示异常`
          },
        ]
      },
      {
        version: '1.0.1',
        date: '2019-08-16 00:27',
        detailArr: [
          {
            type: 'A',
            text: '缓存数据，减少请求操作'
          },
          {
            type: 'F',
            text: `修改记录时文案依旧是'新增记录'的问题，改为'修改记录'`
          },
          {
            type: 'F',
            text: `饮食记录里按新增顺序排序，而不是按时间排序`
          },
          {
            type: 'O',
            text: `饮食记录列表的key原来为时间，考虑后时间可以重复，key改为_id`
          },
          {
            type: 'O',
            text: `提取request请求通用代码封装，开启增强编译，使用async await写法替换promise.then`
          },
          {
            type: 'O',
            text: `首页每次onshow都会刷新数据的问题，仅在日期变更或新增、修改、删除记录返回页面时执行请求数据操作`
          },
          {
            type: 'O',
            text: `暂无记录时，'添加一条记录' 的点击范围增大`
          }
        ]
      },
      {
        version: '1.0.0',
        date: '2019-08-15',
        detailArr: [
          {
            type: 'A',
            text: '基础功能，初始化项目'
          },
        ]
      },
      // {
      //   version: '2.8.0',
      //   date: '2019-07-30',
      //   detailArr: [
      //     {
      //       type: 'A',
      //       text: 'API 小程序后台持续定位功能 '
      //     },
      //     {
      //       type: 'A',
      //       text: '插件 支持连续定位接口 '
      //     },
      //     {
      //       type: 'U',
      //       text: '组件 map 支持显示比例尺'
      //     },
      //     {
      //       type: 'U',
      //       text: '组件 map regionchange 事件 begin 阶段增加触发原因 '
      //     },
      //     {
      //       type: 'F',
      //       text: 'API wx.connectSocket iOS 下在会添加额外的 header Authorization'
      //     }
      //   ]
      // },
      // {
      //   version: '2.8.0',
      //   date: '2019-07-30',
      //   detailArr: [
      //     {
      //       type: 'A',
      //       text: 'API 小程序后台持续定位功能 '
      //     },
      //     {
      //       type: 'A',
      //       text: '插件 支持连续定位接口 '
      //     },
      //     {
      //       type: 'U',
      //       text: '组件 map 支持显示比例尺'
      //     },
      //     {
      //       type: 'U',
      //       text: '组件 map regionchange 事件 begin 阶段增加触发原因 '
      //     },
      //     {
      //       type: 'F',
      //       text: 'API wx.connectSocket iOS 下在会添加额外的 header Authorization'
      //     }
      //   ]
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})
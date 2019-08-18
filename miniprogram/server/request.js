
const { requestCloudFunc } = require('./requestCloudFunc.js')

// 首页 - 登录并获取当前记录
async function server_loginAndGetHistory(app) {

  try {
    let res = await requestCloudFunc.call(this, 'login', {})
    let { openid } = res

    app.globalData.openid = openid
    server_getHistoryData.call(this, this.data.today, openid)

  } catch(err) {
    console.log(err)
  }
}

// 获取当前记录，date 年、月、日，openid
async function server_getHistoryData(date, openid, isNotAllowCache, completeCallback) {

  // 如果允许使用缓存
  if (!isNotAllowCache) {
    console.log('允许使用缓存')
    // 查看缓存里是否有内容
    try {
      var value = wx.getStorageSync(date.join('-'))
      console.log('catch', value)
      if (value) { // 获取到了缓存内容，渲染到页面，终止程序运行
        this.setData({
          history: JSON.parse(value)
        })
        return
      } 
    } catch (e) {
      console.log('获取缓存异常', e.errMsg)
    }
  } else {
    console.log('新增/修改/删除或下拉刷新 不允许使用缓存')
  }

  let data = { date, openid }

  try {
    let res = await requestCloudFunc.call(this, 'getHistory', data)

    // 排序处理，获取的数据，按时间排序
    let tempData = res.data
    tempData.sort((val1, val2) => {
      let time1 = parseInt(val1.time.split(':').join(''))
      let time2 = parseInt(val2.time.split(':').join(''))
      return time1 < time2 ? -1 : (time1 > time2 ? 1 : 0)
    })

    // 设置缓存
    let tempStr = JSON.stringify(tempData)
    console.log(`设置缓存 key: ${date.join('-')}, length: ${tempStr.length}`)

    wx.setStorage({
      key: date.join('-'),
      data: JSON.stringify(tempData)
    })

    // 渲染页面
    this.setData({
      history: tempData
    })
  } catch(err) {
    console.log(err)
  } finally {
    if (completeCallback) {
      completeCallback()
    }
  }
}

// 新增记录
async function server_addHistoryData(date, openid, formData, app) {
  let data = { date, openid, formData }

  try {
    let res = await requestCloudFunc.call(this, 'addHistory', data)
    app.globalData.tempArr.push('need refresh')
    wx.navigateBack({})
  } catch(err) {
    console.log(err)
  }
}

// 修改记录
async function server_editHistoryData(_id, openid, formData, app) {
  let data = { _id, openid, formData }

  try {
    let res = await requestCloudFunc.call(this, 'editHistory', data)
    app.globalData.tempArr.push('need refresh')
    wx.navigateBack({})
  } catch(err) {
    console.log(err)
  }
}

// 删除记录 
async function server_deleteHistoryData(_id, openid, app) {
  let data = { _id, openid }

  try {
    let res = await requestCloudFunc.call(this, 'deleteHistory', data)
    app.globalData.tempArr.push('need refresh')
    wx.navigateBack({})
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  server_loginAndGetHistory,
  server_getHistoryData,
  server_addHistoryData,
  server_editHistoryData,
  server_deleteHistoryData
}
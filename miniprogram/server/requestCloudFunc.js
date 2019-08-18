

function showErrMsg(errMsg) {
  wx.showModal({
    title: '系统提示',
    showCancel: false,
    content: errMsg,
  })
}

function isNetworkOk() {
  return new Promise((resolve, reject) => {
    // 网络异常检测，检测到wifi，不一定有网络，-_-
    wx.getNetworkType({
      success: function (res) {
        console.log(res.networkType)
        resolve(res.networkType === 'none' ? false : true)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 请求云函数
function requestCloudFunc(funcName, data) {
  return new Promise(async (resolve, reject) => {

    // 网络异常检测
    try {
      let hasNetwork = await isNetworkOk()
      if (!hasNetwork) {
        showErrMsg('网络异常，请稍后重试')
        reject('网络异常')
        return;
      } else {
        console.log('网络正常')
      }
    } catch(err) {
      console.log(err)
      showErrMsg(err.errMsg)
    }

    // 加载中...
    wx.showLoading({
      title: 'loading...',
      mask: true  
    })

    wx.cloud.callFunction({
      name: funcName,
      data,
      success: res => {
        let { errCode, errMsg } = res.result
        console.log(`[云函数] [${funcName}] 返回成功`, res.result)
        if (errCode === 0) { // 成功
          resolve(res.result)
        } else { // 失败
          showErrMsg(`[云函数] [${funcName}] 操作失败，${errMsg}`)
        }
      },
      fail: err => {
        console.error(`[云函数] [${funcName}] 调用失败`, err)
        showErrMsg(`[云函数] [${funcName}] 调用失败失败，${err.errMsg}`)
        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })

  })
}

module.exports = {
  requestCloudFunc
}
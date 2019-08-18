// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    let res = await db.collection('history').where({
      openid: event.openid,
      date: event.date.join('-')
    }).get()
    // res {_id: "face13585d5406101422939c2c02b1d7", errMsg: "collection.add:ok"}
    res.errCode = 0
    return res
  } catch (err) {
    return err
    // 如果有错误 {errCode: -1, errMsg: "parameter.data should be object instead of undefined;"}
  }
}
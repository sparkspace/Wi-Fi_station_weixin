//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
  },

  onLoad: function () {
    var that = this
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/9939133/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'VeFI0HZ44Qn5dZO14AuLbWSlSlI='
      },
      success: function (res) {
        console.log(res)      //打印返回的数据
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

})

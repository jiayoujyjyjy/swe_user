// import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { back } from 'api'

const state = {
  wx_debug: false,
  wx_access_token: '',
  wx_configFlag: false
}

const getters = {
  wechatInfo: state => {
    return {
      // wx_appid: state.wx_appid,
      // wx_access_token: state.wx_access_token
    }
  }
}

const mutations = {
  setConfigFlag (state, msg) {
    state.wx_configFlag = msg
  },
  // config接口注入权限验证配置
  INITWX (state, params) {
    let config = {}
    config.debug = state.wx_debug
    config.appId = params.appId
    config.timestamp = params.timestamp
    config.nonceStr = params.nonceStr
    config.signature = params.signature
    config.jsApiList = params.jsApiList
    wx.config(config)
    wx.ready(function () {
      alert('wx config ok')
      state.wx_configFlag = true
    })
    wx.error(function (res) {
      alert('wx error ok')
      state.wx_configFlag = false
    })
  },
  // 获取设备网络状态
  QUENETTYPE (state, payload) {
    alert('nettype')
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        console.log(networkType)
        alert(networkType)
      }
    })
  },
  // 获取地理位置接口
  QUELOCA (state, payload) {
    alert('location')
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        // var latitude = res.latitude  // 纬度，浮点数，范围为90 ~ -90
        // var longitude = res.longitude  // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed  // 速度，以米/每秒计
        // var accuracy = res.accuracy  // 位置精度
        console.log(res)
        payload.success_callback(res)
        alert(res.latitude)
        alert(res.longitude)
      },
      fail: function () {
        payload.fail_callback()
      }
    })
  },
  // 使用微信内置地图查看位置接口
  OPENLOCA (state, payload) {
    wx.openLocation({
      latitude: payload.latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: payload.longitude, // 经度，浮点数，范围为180 ~ -180。
      name: payload.name, // 位置名
      address: payload.address, // 地址详情说明
      scale: payload.scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: payload.infoUrl, // 在查看位置界面底部显示的超链接,可点击跳转
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        console.log()
      }
    })
  },
  // 微信扫一扫
  SCANCODE (state, payload) {
    alert('scancode')
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        console.log(result)
        alert(result)
        payload.success_callback(result)
      }
    })
  },
  // 微信支付接口
  WECHATPAY (state, payload) {
    console.log(payload)
    alert(payload.signType)
    wx.chooseWXPay({
      // appId: payload.appId,
      timestamp: payload.timeStamp,
      nonceStr: payload.nonceStr,
      package: payload.package,
      signType: payload.signType,
      paySign: payload.paySign,
      success: function (res) {
        // 支付成功后的回调函数
        payload.success_callback(res)
        alert('支付完成')
      },
      cancel: function (res) {
        alert('支付取消')
        alert(res.errMsg)
        // 支付取消的回调函数
      },
      fail: function (res) {
        alert('支付失败')
        alert(res.errMsg)
        // 支付失败的回调函数
        payload.fail_callback(res)
      }
    })
  }
}

const actions = {
  initWX ({commit}, value) {
    commit('INITWX', value)
  },
  getWeChatSignature ({commit}, desurl) {
    // let url = 'http://wx.mozziewang.xyz/liveroom/roomname/dd/rid/1/username/ddddd/uid/1/usertype/1';
    // let jsonpUrl = 'http://wxapi.qingzz.com/wx/getsignature?url=' + url
    // console.log(jsonpUrl)
    back.jsSdkGet(desurl).then(function (response) {
      console.log(response)
      var initConfigVal = {}
      initConfigVal.appId = 'wx4b75af9eff46a80b'
      initConfigVal.timestamp = response.data.timestamp
      initConfigVal.nonceStr = response.data.nonceStr
      initConfigVal.signature = response.data.signature
      initConfigVal.jsApiList = [ 'chooseImage', 'uploadImage', 'getNetworkType', 'getLocation', 'openLocation', 'scanQRCode', 'chooseWXPay' ]
      commit('INITWX', initConfigVal)
    })
    // Vue.http.get(jsonpUrl).then(function (response) {
    //   var initConfigVal = {}
    //   initConfigVal.appId = response.data.appId
    //   initConfigVal.timestamp = response.data.timestamp
    //   initConfigVal.nonceStr = response.data.nonceStr
    //   initConfigVal.signature = response.data.signature
    //   initConfigVal.jsApiList = ['chooseImage', 'uploadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'chooseWXPay', 'uploadVoice']
    //   commit('INITWX', initConfigVal)
    // })
  },
  queNetworkType ({commit}, value) {
    commit('QUENETTYPE', value)
  },
  queLocation ({commit}, value) {
    commit('QUELOCA', value)
  },
  openLocation ({commit}, value) {
    commit('OPENLOCA', value)
  },
  scanQRCode ({commit}, value) {
    commit('SCANCODE', value)
  },
  wechatPay ({commit}, value) {
    commit('WECHATPAY', value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

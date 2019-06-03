import service from './axios'
// import * as url from './urlConfig'
import { character } from '@/components/config/Character'
// axios.defaults.withCredentials = true

// 对后台进行请求
export const back = {
  // 1.1 查询微信用户信息
  userInfoQue (param) {
    return service({
      url: `/charging/wx/user?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 1.2 分页获取微信用户的充值记录
  tradeRecordQue (param) {
    return service({
      url: `/charging/wx/trade/history?page=${param.page}&size=${param.size}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 1.3 分页获取微信用户的充电记录
  chargerRecordQue (param) {
    return service({
      url: `/charging/wx/user/charger/history?page=${param.page}&size=${param.size}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 1.4 查询用户是否关注公众号
  subscribeQue (param) {
    return service({
      url: `/charging/wx/user/subscribe?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 2.1获取微信授权地址
  // type: 1是附近电站，2是充电界面，3是用户界面。如果type=2需要额外携带uid参数。
  tokenAddGet (param) {
    return service({
      url: `/charging/wx/address?type=${param.type}&uid=${param.uid}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 3 绑定微信用户手机号
  phoneBind (param) {
    return service({
      url: `/charging/wx/user?mobile=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 4 JS-SDK加密接口
  jsSdkGet (param) {
    return service({
      url: `/charging/wx/js/sign?url=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 5.1 预支付订单请求接口
  wxPrepay (param) {
    return service({
      url: `/charging/wx/trade/prepay?fee=${param}`,
      method: 'post',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 5.2 交易后余额查询
  balanceQue (param) {
    return service({
      url: `/charging/wx/trade/balance?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.1 获取电站名、插座名和使用状态、用户余额
  chargePowerQue (param) {
    return service({
      url: `/charging/wx/power?uid=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.2 获取插座的功率区间
  chargePowerRangeQue (param) {
    return service({
      url: `/charging/wx/power/range?uid=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.3 获取插座实时功率
  chargePowerCurrentQue (param) {
    return service({
      url: `/charging/wx/power/current?uid=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.4 定时查询充电中的插座数据
  chargeSocketInfoQue (param) {
    return service({
      url: `/charging/wx/power/schedule?uid=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.5 开始充电
  chargeSocketOpen (param) {
    return service({
      url: `/charging/wx/power/start?uid=${param.uid}&type=${param.type}`,
      method: 'post',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 6.6 停止充电
  chargeSocketClose (param) {
    return service({
      url: `/charging/wx/power/stop?uid=${param}`,
      method: 'post',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 7 附近电站
  nearbyPowerQue (param) {
    return service({
      url: `/charging/wx/station/list?lat=${param.lat}&lon=${param.lon}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 8 常用电站查看
  usualPowerQue (param) {
    return service({
      url: `/charging/wx/station/usual?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 9 获取充电桩下插座的状态信息
  socketListQue (param) {
    return service({
      url: `/charging/wx/station/socket/list?sn=${param.sn}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 10 获取微信用户的唯一ID
  userUidQue (param) {
    return service({
      url: `/charging/wx/user/uid?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 11 获取正在充电列表
  chargingNowQue (param) {
    return service({
      url: `/charging/wx/user/chargingNum?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 12 根据二维码底部UID确认插座UID
  socketUidVer (param) {
    return service({
      url: `/charging/wx/station/socket/uid?uid=${param.uid}&id=${param.id}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  // &1 获取短信验证码
  smsCheck (param) {
    return service({
      url: `/charging/util/smsCode?mobile=${param}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // &4 续签微信端session
  sessionTimeAdd (param) {
    return service({
      url: `/charging/wx/session?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  // 9
  urltestQue (param) {
    return service({
      url: `/charging/wx/redirect?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  cookieGet (param) {
    return service({
      url: `/charging/wx/cookie?time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
      },
      data: {
      },
      withCredentials: true
    })
  },
  wxPayGet (param) {
    return service({
      url: `/charging/wx/trade/prepay?fee=${param}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  wxPayEndQue (param) {
    return service({
      url: `/charging/wx/trade/state`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  },
  tokenAddPost (param) {
    return service({
      url: `/charging/wx/test1?time=${character.randomWord(true, 9, 12)}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
  }
}

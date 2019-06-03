import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import { character } from '@/components/config/Character'

import EleMap from '@/components/eleMap'
import ChargePage from '@/components/chargePage'
import User from '@/components/user'
import Blank from '@/components/blank'
import Recharge from '@/components/userPage/recharge'
import Rechargetest from '@/components/userPage/rechargetest'
import ChargingPile from '@/components/userPage/chargingPile'
import ComPowerStation from '@/components/userPage/comPowerStation'
import RechargeRecord from '@/components/userPage/rechargeRecord'
import ChargeRecord from '@/components/userPage/chargeRecord'
import AboutMe from '@/components/userPage/aboutMe'
import BindPhone from '@/components/userPage/bindPhone'
import Family from '@/components/userPage/family'

import VueCookies from 'vue-cookies'
import store from '../vuex/store'
import { back } from 'api'

Vue.use(VueRouter)
Vue.use(VueCookies)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/user' },
    { path: '/chargePage', name: 'chargePage', component: ChargePage },
    { path: '/eleMap', name: 'eleMap', component: EleMap },
    { path: '/user', name: 'user', component: User },
    { path: '/blank', name: 'blank', component: Blank },
    { path: '/recharge', name: 'recharge', component: Recharge },
    { path: '/rechargetest', name: 'rechargetest', component: Rechargetest },
    { path: '/chargingPile', name: 'chargingPile', component: ChargingPile },
    { path: '/comPowerStation', name: 'comPowerStation', component: ComPowerStation },
    { path: '/rechargeRecord', name: 'rechargeRecord', component: RechargeRecord },
    { path: '/chargeRecord', name: 'chargeRecord', component: ChargeRecord },
    { path: '/aboutMe', name: 'aboutMe', component: AboutMe },
    { path: '/bindPhone', name: 'bindPhone', component: BindPhone },
    { path: '/family', name: 'family', component: Family }
  ]
})
router.beforeEach((to, from, next) => {
  alert('to from')
  console.log('beforeEach')
  console.log(window.location)
  console.log(this)
  console.log(to)
  console.log(from)
  console.log(next)
  // document.title = to.meta.title
  // 处理jssdk签名,兼容history模式
  if (!store.state.desUrl) {
    store.commit('setDesUrl', document.URL)
  }
  alert(document.URL)
  console.log(document.URL)
  var d = VueCookies.get('wxssid')
  console.log(d)
  // var secUrl = document.URL.split('?')[1]
  // if (secUrl !== '') {
  //   store.commit('setSecUrlSave', secUrl)
  //   alert(secUrl)
  // }
  // 每次页面跳转都需要存储type信息，配合http拦截器使用
  var arr = ['user', 'recharge', 'chargingPile', 'comPowerStation', 'chargeRecord', 'rechargeRecord', 'aboutMe', 'bindPhone', 'family']
  var param = {
    type: 3,
    uid: ''
  }
  var desTo = to.name
  if (arr.indexOf(desTo) > -1) {
    // 个人中心及其子页面都认为是在user页面
    param.type = 3
  } else if (desTo === 'eleMap') {
    param.type = 1
  } else if (desTo === 'chargePage') {
    param.type = 2
    if (document.URL.indexOf('uid') > 0) {
      var uidParam = document.URL.split('?')
      var uid = uidParam[uidParam.length - 1].split('=')[1]
      param.uid = uid
    }
  }
  store.commit('setTypeParam', param)
  // 无cookie，没有用户信息，说明用户第一次使用
  // 有cookie，没有用户信息，说明授权完成，二次三次进入页面
  // 无cookie，有用户信息，cookie过期，重新发起授权
  // 有cookie，有用户信息，正常使用
  if (!VueCookies.get('wxssid')) {
    // 第一次访问
    console.log('授权登录')
    // store.commit('setSecUrlSave', 'numberOne')
    axios({
      url: `http://wx.swehongshi.com/charging/wx/address?type=${param.type}&uid=${param.uid}&time=${character.randomWord(true, 9, 12)}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      withCredentials: true
    })
      .then((response) => {
        // return response.data
        if (response.data.errno === 0) {
          window.location.href = response.data.data.address
        }
      })
      .catch((error) => {
        console.log(error)
      })
  } else if (!store.state.userUid) {
    // 刷新页面，获取数据存入vuex
    back.userUidQue().then(function (response) {
      console.log(response)
      var data = response
      if (data.errno === 0) {
        store.commit('setUserUid', response.data.uid)
        next()
      }
    })
    console.log('cookie生效期内登录')
    alert('cookie生效期')
    next()
  } else {
    // 已经登录
    console.log('已登录')
    next()
  }
})

export default router

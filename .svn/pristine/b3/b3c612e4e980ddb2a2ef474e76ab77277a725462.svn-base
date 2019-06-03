<template>
  <div id="app">
    <view-box ref="viewbox">
      <x-header class="vux-demo-header-box" slot="header" style="position: absolute;">鸿世充电</x-header>
        <router-view/>
      <tabbar class="tabbarcss" slot="bottom" style="position: absolute;">
        <tabbar-item link="/eleMap"  @click.native="changeLocationImg">
          <img slot="icon" :src="srcLoaction">
          <span slot="label">附近电站</span>
        </tabbar-item>
        <tabbar-item @click.native="scanCode">
          <img slot="icon" :src="srcScan">
          <span slot="label">扫描插座</span>
        </tabbar-item>
        <tabbar-item link="/user"  @click.native="changeUserImg">
          <img slot="icon" :src="srcUser">
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { back } from 'api'
import Routers from '@/router'
import { Tabbar, TabbarItem, Group, Cell, XHeader, ViewBox } from 'vux'

export default {
  name: 'App',
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XHeader,
    ViewBox
  },
  data () {
    return {
      msg: 'app Page',
      timerSession: 0,
      srcLoaction: '/static/location.png',
      srcScan: '/static/scan.png',
      srcUser: '/static/user.png'
    }
  },
  created: function () {
    // 注释掉所有的输出和弹窗
    console.log = function () {}
    window.alert = function () {}
    var url = this.$store.state.desUrl
    console.log(url)
    var urlcode = url.split('#')[0]
    // js-sdk配置wx.config
    this.$store.dispatch('getWeChatSignature', urlcode)
  },
  mounted: function () {
    // 10秒钟之后定时循环续签时间
    window.setTimeout(this.queryLoop, 10000)
    // 10秒钟之后第一次续签时间
    window.setTimeout(this.addBackSessionTime, 10000)
    console.log('mouted timeout')
  },
  // 生命周期，销毁前
  beforeDestroy: function () {
    // 停止定时器
    window.clearInterval(this.timerSession)
    console.log('leave one')
  },
  methods: {
    // 开启定时器，定时查询指定插座上的最新数据
    queryLoop: function () {
      console.log('queryloop timeval')
      // 停止定时器
      window.clearInterval(this.timerSession)
      this.timerSession = window.setInterval(this.addBackSessionTime, 360000)
    },
    // 定时续签时间
    addBackSessionTime: function () {
      // 续签时间
      this.backSessionTimeAdd()
    },
    // 二维码扫描
    scanCode: function () {
      console.log('scancode')
      this.srcLoaction = '/static/location.png'
      this.srcScan = '/static/scanSelected.png'
      this.srcUser = '/static/user.png'
      var payload = {}
      payload.success_callback = this.scanCallback
      this.$store.dispatch('scanQRCode', payload)
    },
    // 更改定位图标颜色
    changeLocationImg: function () {
      this.srcLoaction = '/static/locationSelected.png'
      this.srcScan = '/static/scan.png'
      this.srcUser = '/static/user.png'
    },
    // 更改用户图标颜色
    changeUserImg: function () {
      this.srcLoaction = '/static/location.png'
      this.srcScan = '/static/scan.png'
      this.srcUser = '/static/userSelected.png'
    },
    // 二维码扫描回调处理函数
    scanCallback: function (res) {
      alert(res)
      console.log(res)
      // 获取当前页面的路由
      // 因为在调试时发现一个问题，当用户扫描二维码到充电页面之后，继续扫描另一个二维码，
      // 充电页面的插座信息不会更新，因为从chargePage页面push chargePage是不会发生跳转的
      // 获取当前页面url后，判断当前页面是否为chargePage,是则先跳转到blank页面再跳回来，不是则正常跳转
      // 注意不要刷新页面，否则会丢失vuex数据
      let list = document.URL.split('/')
      let currentPage = list[list.length - 1].split('?')[0]
      //  扫码多用于充电桩插座的跳转
      //  扫码得到该充电桩插座的相关信息，直接访问后台
      //  后台协助跳转到指定充电页面，再依据cookie进行后续操作
      if (res.indexOf('?') !== -1) {
        if (res.split('?')[1].indexOf('=') !== -1) {
          var uidParam = res.split('?')
          var uid = uidParam[uidParam.length - 1].split('=')[1]
          alert(uid)
          if (res.split('#')[1].indexOf('/chargePage') !== -1) {
            this.$store.commit('setChargeSocketUid', uid)
            alert('chargeIN')
            if (currentPage === 'chargePage') {
              Routers.push({ path: '/blank' })
            } else {
              Routers.push({ path: '/chargePage' })
            }
          }
        }
      } else {
        Routers.push({ path: '/user' })
      }
    },
    /*
    **  **********  API调用相关函数  **********
    */
    // 定时续签时间
    backSessionTimeAdd: function () {
      alert('SessionTimeAdd')
      console.log('SessionTimeAdd')
      back.sessionTimeAdd().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          console.log('续签时间')
        } else {
          console.log(response.error)
        }
      })
    }
  }
}
</script>

<style>
body, html {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-user-select: none;
  user-select: none;
}
a {
  text-decoration: none;
}
#app {
  color: #2c3e50;
  height:100%;
  width: 100%;
  overflow-x: hidden;
}
.vux-header {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.tabbarcss {
  height: 56px;
}
.weui-tabbar__label {
  line-height: 0.3!important;
}

</style>

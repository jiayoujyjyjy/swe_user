<template>
  <div class="userPage">
    <group class="userInfoCss">
      <panel :list="list" :type="type" @click.native="phoneCheck"></panel>
    </group>
    <group>
      <cell class="cellcss" :title="rechargeTitle" is-link :link="{path:'/recharge'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/recharge.png">
      </cell>
    </group>
    <group >
      <cell class="cellcss" :title="chargeTitle" is-link :link="chargePath">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/charge.png">
      </cell>
      <cell class="cellcss" title="常用电站" is-link :link="{path:'/comPowerStation'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/comPower.png">
      </cell>
      <cell class="cellcss" title="充值记录" is-link :link="{path:'/rechargeRecord'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/rechargeRecord.png">
      </cell>
      <cell class="cellcss" title="充电记录" is-link :link="{path:'/chargeRecord'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/chargeRecord.png">
      </cell>
      <cell class="cellcss" title="家人模式" is-link :link="{path:'/family'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/family.png">
      </cell>
      <cell class="cellcss" title="GPS设备" is-link :disabled="disabledAddRecharge">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/gpsDev.png">
      </cell>
    </group>
    <group>
      <cell class="cellcss" title="关于我们" :disabled="disabledAddBalance" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/aboutMe.png">
      </cell>
    </group>
    <br>
    <div v-transfer-dom>
      <alert v-model="userInfoShow" title="说明" :content="userInfoContent" @on-hide="userAlertHide"></alert>
    </div>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, Cell, Panel, TransferDomDirective as TransferDom, Alert } from 'vux'
import { back } from 'api'

export default {
  name: 'user',
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Panel,
    Alert
  },
  data () {
    return {
      rechargeTitle: '我要充值',
      chargeTitle: '正在充电',
      chargePath: {path: '/chargingPile'},
      disabledAddRecharge: true,
      disabledAddBalance: true,
      msg: 'user Page',
      userInfoShow: false,
      userInfoContent: '',
      type: '1',
      list: [{
        src: '/static/user.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '未登录',
        desc: '电话号码：未绑定',
        phone: '', // 88767140
        url: ''
      }]
    }
  },
  created: function () {
    // console.log('user')
    // 获取用户信息
    this.backUserInfo()
    // let currentUrl = location.href.split('#')[0]
    // console.log('currenturl:=' + currentUrl)
    // this.$store.dispatch('getWeChatSignature', currentUrl)
  },
  methods: {
    // 手机绑定检查，如果没检查，要求绑定手机号，否则不允许充值
    // 在该页面点击用户头像，检测到未绑定手机号，跳转到绑定手机号页面中
    phoneCheck: function () {
      console.log('phoneCheck')
      var reg = /^1\d{10}$/
      if (this.list[0].phone === '' || !reg.test(this.list[0].phone)) {
        Routers.push({ path: '/bindPhone' })
      }
    },
    userAlertHide: function () {
      console.log('error')
      // window.close()
    },
    //
    // *********API***********
    //
    // 获取用户信息
    backUserInfo: function () {
      back.userInfoQue().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.list[0].title = response.data.nickName
          this.list[0].src = response.data.headImgUrl
          if (response.data.chargingNum === 0 || response.data.chargingNum === '0') {
            this.chargePath = null
          } else {
            this.chargePath = {path: '/chargingPile'}
          }
          this.rechargeTitle = '我要充值' + '(' + '余额' + ':' + response.data.balance + '元' + ')'
          this.chargeTitle = '正在充电' + '(' + response.data.chargingNum + '条' + ')'
          if (response.data.mobile === undefined || response.data.mobile === '' || response.data.mobile === null) {
            this.list[0].desc = '未绑定手机号'
            this.list[0].phone = ''
          } else {
            var phone = response.data.mobile
            phone = phone.split('')
            phone.splice(5, 4, 'xxxx')
            phone = phone.join('')
            this.list[0].desc = phone
            this.list[0].phone = response.data.mobile
          }
          alert(response.data.nickName)
          alert(response.data.headImgUrl)
          console.log(this.list)
        } else {
          this.userInfoContent = '用户信息获取失败，请退出重试'
          this.userInfoShow = true
          console.log(response.error)
        }
      }.bind(this))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.userPage {
  padding-top: 46px;
}
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.cellcss {
  height: 25px;
}
</style>

<template>
  <div class="rechargePage">
    <flexbox orient="vertical">
      <flexbox-item :span="1/4" style="background-color:#deb887;">
        <div id="balancePage">
          <div id="allbalance" >
            <h1>{{remainderNum}}元</h1>
            <h1>当前余额</h1>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item :span="3/4">
          <group>
            <cell class="cellcss" title="支付方式:" value="微信支付"></cell>
            <cell class="cellcss" title="充值账户:" :value="userPhone"></cell>
            <br>
            <checker
              v-model="selectedNumber"
              default-item-class="checker-item"
              selected-item-class="checker-item-selected"
              :radio-required = "radioRequiredFlag"
              >
              <checker-item :value="item" v-for="(item, index) in moneyOption" :key="index">{{item.value}}元</checker-item>
            </checker>
            <br>
          </group>
          <x-button type="primary" action-type="button" @click.native="rechargeClick">确定</x-button>
          <p class="protocolP">为开通分账功能的内部测试页面</p>
          <div v-transfer-dom>
            <alert v-model="alertShow" :title="alertTitle" :content="alertContent"  @on-hide="noticeHide"></alert>
          </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Routers from '@/router'
import { Flexbox, FlexboxItem, Checker, CheckerItem, XButton, Group, Cell, TransferDomDirective as TransferDom, Alert } from 'vux'
import { back } from 'api'

export default {
  name: 'rechargePage',
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Flexbox,
    FlexboxItem,
    XButton,
    Group,
    Cell,
    Alert
  },
  data () {
    return {
      msg: 'user Page',
      list: [{
        src: '/static/user.png',
        fallbackSrc: '',
        title: '凌云',
        desc: '我的电话号码是：123456',
        url: ''
      }],
      moneyOption: [{
        key: '1',
        value: '10'
      }, {
        key: '2',
        value: '15'
      }, {
        key: '3',
        value: '20'
      }, {
        key: '4',
        value: '30'
      }, {
        key: '5',
        value: '60'
      }, {
        key: '6',
        value: '100'
      }],
      remainderNum: 0.0,
      userPhone: '15957****64',
      alertTitle: '充值协议',
      alertShow: false,
      radioRequiredFlag: true,
      selectedNumber: null,
      alertContent: '充值费用只限于充电，不能退还哦~~'
    }
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    var url = this.$store.state.desUrl
    console.log(url)
    var urlcode = url.split('#')[0]
    this.$store.dispatch('getWeChatSignature', urlcode)
    console.log('recharge')
    // 获取用户当前账号信息
    // 获取用户当前余额
    this.backUserInfo()
  },
  mounted: function () {
    this.selectedNumber = this.moneyOption[0]
  },
  methods: {
    // 确定支付
    rechargeClick: function () {
      console.log(this.selectedNumber)
      console.log('rechargeClick')
      console.log('pay')
      // if (this.selectedNumber === null || this.selectedNumber === '') {
      //   console.log('金额不能为空')
      //   return
      // }
      // var number = parseInt(this.selectedNumber.value) * 100
      // 微信支付
      // 获取当前金额
      // 默认1元钱，调试用，后期改为正常金额
      var number = 1 * 100
      var payload = {
        timeStamp: '123213',
        nonceStr: '12123',
        package: '123123',
        signType: 'MD5',
        paySign: ''
      }
      back.wxPrepay(number).then(function (response) {
        console.log(response.timestamp)
        payload.appId = response.data.appId
        payload.timeStamp = response.data.timeStamp
        payload.nonceStr = response.data.nonceStr
        payload.package = response.data.packageValue
        payload.signType = response.data.signType
        payload.paySign = response.data.paySign
        payload.success_callback = this.paySuccess
        payload.faid_callback = this.payFail
        this.$store.dispatch('wechatPay', payload)
      }.bind(this))
    },
    // 支付成功回调函数
    paySuccess: function (res) {
      console.log(res)
      // var last = JSON.stringify(res)
      // 获取用户余额(交易2S之后)
      this.backRemainderQue()
      this.alertTitle = '通知'
      this.alertContent = '支付成功'
      this.alertShow = true
    },
    // 支付失败回调函数
    payFail: function (res) {
      console.log(res)
      // var last = JSON.stringify(res)
      // 获取用户余额(交易2S之后)
      this.backRemainderQue()
      this.alertTitle = '通知'
      this.alertContent = '支付失败'
      this.alertShow = true
    },
    // 用户位绑定手机号，弹框提醒，弹框关闭后，退出当前页面，不允许未绑定的用户在充值页面停留
    noticeHide: function () {
      if (this.alertTitle === '温馨提示') {
        Routers.go(-1)
      }
    },
    /*
    **  **********  API调用相关函数  **********
    */
    // 获取用户信息(检测是否有手机号，没有则跳转让用户绑定手机号)
    backUserInfo: function () {
      back.userInfoQue().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.list[0].title = response.data.nickName
          this.list[0].src = response.data.headImgUrl
          var reg = /^1[3|4|5|8][0-9]\d{8}$/
          if (response.data.mobile === undefined || response.data.mobile === '' || response.data.mobile === null || !reg.test(response.data.mobile)) {
            this.list[0].desc = '未绑定手机号'
            this.list[0].phone = ''
            this.userPhone = ''
            this.alertTitle = '温馨提示'
            this.alertContent = '请在个人中心点击头像进行手机号码绑定'
            this.alertShow = true
            // Routers.push({ path: '/bindPhone' })
            // Routers.go(-1)
          } else {
            this.list[0].desc = response.data.mobile
            this.list[0].phone = response.data.mobile
            this.userPhone = response.data.mobile
          }
          this.remainderNum = response.data.balance
          console.log(this.list)
        } else {
          console.log(response.error)
        }
      }.bind(this))
    },
    // 获取用户余额(交易2S之后)
    backRemainderQue: function () {
      console.log('remainder')
      // 获取用户余额
      back.balanceQue().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.remainderNum = response.data.balance
        } else {
          console.log(response.error)
        }
      }.bind(this))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rechargePage {
  height: 100%;
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
.vux-flexbox {
  height: 100%;
}
.vux-flexbox .vux-flexbox-item {
  overflow-y: auto;
}
.cellcss {
  padding-top: 1px!important;
  padding-bottom: 1px!important;
}
#balancePage {
  height: 100%;
}
#allbalance {
  padding-top: 46px;
  line-height: 14px;
  text-align: center;
}
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
.checker-item {
  width: 25%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ececec;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.checker-item-selected {
  border: 1px solid rgb(216, 122, 33);
}
.protocolP {
  margin-top: 0px;
  text-align: center;
}

</style>

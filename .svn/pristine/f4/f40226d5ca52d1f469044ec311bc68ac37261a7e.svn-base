<template>
  <div class="bindPhone">
    <divider>手机号绑定</divider>
    <group title="手机号码">
      <x-input title="手机号码" class="weui-vcode" mask="99999999999" v-model="maskPhoneValue" :max="13" is-type="china-mobile">
      </x-input>
    </group>
    <group title="验证码">
      <x-input title="验证码" class="weui-vcode" v-model="checkCodeValue" mask="999999" :min="6" :max="6">
        <x-button slot="right" type="primary" v-show="!regiterComputedTime" mini @click.native="checkCodeClick">发送验证码</x-button>
        <x-button slot="right" type="primary" v-show="regiterComputedTime" mini >已发送({{regiterComputedTime}}s)</x-button>
      </x-input>
    </group>
    <br>
    <x-button plain type="primary" @click.native="bindPhoneClick">确定</x-button>
    <div v-transfer-dom>
      <alert v-model="tipShow" title="提示" :content="tipContent"></alert>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showdialog" :dialog-style="{ width: '75%', 'padding': '10px 20px 20px'}">
        <div class="dia_close" @click="closeDialog">
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <div class="img-box">
          <qrcode :value="qrValue" type="img"></qrcode>
        </div>
        <div>
          <span>您还未关注公众号，无法收到消息推送，请长按识别二维码关注！</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, Panel, Divider, XInput, XDialog, Qrcode, XButton, TransferDomDirective as TransferDom, Alert } from 'vux'
import { back } from 'api'

export default {
  name: 'bindPhonePage',
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    Qrcode,
    Group,
    Panel,
    Divider,
    XInput,
    XButton,
    Alert
  },
  data () {
    return {
      msg: 'bindPhone Page',
      regiterComputedTime: 0, // 用户注册短信倒数记时
      bindPhoneNumber: '', // 记录获取验证码的时候输入的手机号
      maskPhoneValue: '', // 当前输入框中输入的手机号
      checkCodeValue: '', // 当前输入的验证码
      backCodeValue: '', // 后台传回来的验证码
      tipShow: false,
      qrValue: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3MTY5NzUyMA==#wechat_redirect',
      showdialog: false,
      tipContent: ''
    }
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    console.log('user')
    // 获取用户信息
    // this.backUserInfo()
    this.backSubscribeQue()
  },
  methods: {
    // 获取验证码
    checkCodeClick: function () {
      console.log('checkCode')
      var mobile = this.maskPhoneValue
      var reg = /^1\d{10}$/
      if (mobile.length !== 11 || !reg.test(mobile)) {
        this.tipContent = '请输入正确的手机号'
        this.tipShow = true
      }
      this.bindPhoneNumber = this.maskPhoneValue
      console.log(this.checkCodeValue)
      console.log(this.maskPhoneValue)
      // 获取短信验证码
      this.backCodeQue(mobile)
      this.regiterComputedTime = 60
      this.regiterTimer = setInterval(() => {
        this.regiterComputedTime--
        if (this.regiterComputedTime === 0) {
          clearInterval(this.regiterTimer)
        }
      }, 1000)
    },
    // 确定绑定手机号
    bindPhoneClick: function () {
      var mobile = this.maskPhoneValue
      var code = this.checkCodeValue
      if (code.length !== 6) {
        return
      }
      if (this.bindPhoneNumber !== this.maskPhoneValue) {
        alert('手机号码不一致')
        return
      }
      console.log('bindPhone')
      if (this.checkCodeValue === this.backCodeValue) {
        // 绑定微信用户手机号
        this.backPhoneBind(mobile)
        this.tipContent = '绑定成功'
        this.tipShow = true
        Routers.push({ path: '/user' })
      } else {
        this.tipContent = '验证码错误'
        this.tipShow = true
      }
    },
    closeDialog: function () {
      this.backSubscribeQue()
    },
    /*
    **  **********  API调用相关函数  **********
    */
    // 获取用户信息
    backUserInfo: function () {
      back.userInfoQue().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          if (response.data.mobile === undefined || response.data.mobile === '' || response.data.mobile === null) {
          } else {
            Routers.push({ path: '/user' })
          }
        } else {
          console.log(response.error)
        }
      })
    },
    // 获取用户是否关注公众号
    backSubscribeQue: function () {
      back.subscribeQue().then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          if (response.data.subscribe) {
            this.showdialog = false
            this.backUserInfo()
          } else {
            this.showdialog = true
          }
        } else {
          console.log(response.error)
        }
      }.bind(this))
    },
    // 绑定微信用户手机号
    backPhoneBind: function (mobile) {
      back.phoneBind(mobile).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.tipContent = '绑定成功'
          this.tipShow = true
          Routers.push({ path: '/user' })
        } else {
          this.tipContent = '绑定失败，请重试'
          this.tipShow = true
          console.log(response.error)
        }
      })
    },
    // 获取短信验证码
    backCodeQue: function (mobile) {
      back.smsCheck(mobile).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.backCodeValue = response.data.code
          console.log(response.data.code)
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
.bindPhone {
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
.bindPhone >>> button.weui-btn_plain-primary {
  width: 90%;
}
.bindPhone >>> button.weui-btn+.weui-btn {
  margin-top: 0px;
}
.dia_close {
  text-align: right;
}
.img-box {
  margin: 0 0 20px;
}
</style>

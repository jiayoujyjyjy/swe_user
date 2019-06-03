<template>
  <div class="chargePage">
    <swiper :list="displayList" v-model="displayIndex" auto loop></swiper>
    <group label-width="5em">
      <cell primary="content" :title="pileLocation" :value="socketLocation"></cell>
    </group>
      <card v-if="chargingFlag" class="dong">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <img class="imageCss" src="/static/location.png">
            <br>
            <span>当前功率</span>
            <br>
            <span>{{powerNow}}瓦</span>
            <br>
            <span>{{powerPrice}}元/小时</span>
          </div>
          <div class="vux-1px-r">
            <img class="imageCss" src="/static/location.png">
            <br>
            <span>充电进度</span>
            <br/>
            <span>{{chargeTime}}分钟</span>
            <br>
            <span>已消费{{costNumber}}元</span>
          </div>
          <div class="vux-1px-r">
            <img class="imageCss" src="/static/location.png">
            <br>
            <span>电池性能</span>
            <br>
            <span>^_^</span>
            <br>
            <span>即将上线</span>
          </div>
        </div>
      </card>
      <div v-else class="mchoice">
        <checker
        v-model="selectedTime"
        default-item-class="time-item"
        selected-item-class="time-item-selected"
        :radio-required = "radioRequiredFlag"
        >
          <checker-item v-for="timeItem in timeItems" :key="timeItem.id" :value="timeItem" @on-item-click="checkerItemClick">{{timeItem.value}}</checker-item>
        </checker>
      </div>
      <x-button class="button" type="primary" :disabled="disableChargeBt" :show-loading="loadingFlag" @click.native="chargeClick">{{buttonContent}}</x-button>
      <scroller lock-y scrollbar-x ref="scroller">
        <div class="powerBox">
          <div class="powerBox-item" v-for="powerExplain in powerExplains" :key="powerExplain.id">
            <span class="powerBox-range">{{powerExplain.powerRange}}</span>
            <br>
            <span class="powerBox-price">{{powerExplain.powerPrice}}元/小时</span>
          </div>
        </div>
      </scroller>
      <divider>余额</divider>
      <div class="recharge">
        <p class="rechargep">账户余额：¥ {{remainder}}</p>
        <x-button class="button1" type="primary" @click.native="rechargeClick">充值</x-button>
      </div>
      <divider>说明</divider>
      <div class="shuoming">
        <p> 1.为了防止安全隐患，充满自停默认上限为10小时</p>
        <p> 2.充电按分钟计费，联系电话</p>
      </div>
      <div v-transfer-dom>
        <alert v-model="alertShow" :title="alertTitle" :content="alertContent" @on-hide="alertHide"></alert>
      </div>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, Panel, Swiper, Cell, Checker, CheckerItem, Grid, Divider, GridItem, Card, XButton, Scroller, TransferDomDirective as TransferDom, Alert } from 'vux'
import { back } from 'api'

export default {
  name: 'chargePage',
  directives: {
    TransferDom
  },
  data () {
    return {
      displayList: [{
        url: 'javascript:',
        img: '/static/flower.jpg',
        title: ''
      }],
      timeItems: [{
        id: 1,
        type: 0,
        value: '充满自停'
      }, {
        id: 2,
        type: 1,
        value: '1h'
      }, {
        id: 3,
        type: 2,
        value: '2h'
      }, {
        id: 4,
        type: 3,
        value: '3h'
      }, {
        id: 5,
        type: 6,
        value: '6h'
      }, {
        id: 6,
        type: 9,
        value: '9h'
      }],
      powerExplains: [{
        id: 1,
        powerMin: 0,
        powerMax: 100,
        powerRange: '0≤功率≤200',
        powerPrice: '0.3'
      }, {
        id: 2,
        powerMin: 0,
        powerMax: 100,
        powerRange: '200≤功率≤500',
        powerPrice: '0.4'
      }, {
        id: 3,
        powerMin: 0,
        powerMax: 100,
        powerRange: '500≤功率≤900',
        powerPrice: '0.5'
      }],
      timerSocket1: 0,
      timerSocket2: 0,
      timerSocket3: 0,
      socketUid: 'ffddee0000011',
      pileLocation: '无',
      socketLocation: '无',
      radioRequiredFlag: true,
      chargingFlag: 0,
      powerNow: '0',
      powerPrice: '0.0',
      chargeTime: '0',
      costNumber: '0.0',
      disableChargeBt: false,
      buttonContent: '开始充电',
      remainder: '0.0',
      loadingFlag: false,
      alertShow: false,
      alertTitle: '提示',
      alertContent: '充值费用只限于充电，不能退还哦',
      displayIndex: 0,
      selectedTime: null,
      locational: 23,
      bindPhone: false // 当前用户是否绑定手机号
    }
  },
  components: {
    Checker,
    CheckerItem,
    Group,
    Panel,
    Swiper,
    Cell,
    Grid,
    Card,
    Divider,
    GridItem,
    XButton,
    Scroller,
    Alert
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    console.log('chargepage')
    if (document.URL.indexOf('uid') > 0) {
      alert(document.URL)
      var uidParam = document.URL.split('?')
      var uid = uidParam[uidParam.length - 1].split('=')[1]
      this.socketUid = uid
    } else {
      var storeSocketUid = this.$store.state.chargeSocketUid
      if (storeSocketUid === undefined || storeSocketUid === '') {
        alert('uid无效')
        Routers.push({ path: '/user' })
      }
      // 获取Uid并存储
      this.socketUid = storeSocketUid
    }
    alert(this.socketUid)
    alert('join charge page')
    // 获取该插头的数据
    // 获取插头数据分三种情况，第一、用户进入自己当前的充电插头
    // 第二、用户在附近电站和常用电站里进入其他的充电插头
    // 第三、用户扫描进入指定的充电插头
    // 进入页面再发送给后台具体充电桩和插头参数，获取对应信息
    // this.backSocketInfo()
  },
  mounted: function () {
    // 默认选择充满自停
    this.selectedTime = this.timeItems[0]
    // 获取该插头的数据
    this.backSocketInfo()
    // 获取功率对应价格区间
    this.backPowerPriceInfo()
    // 定时循环查询
    this.queryLoop1()
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    })
  },
  // 生命周期，销毁前
  beforeDestroy: function () {
    // 停止定时器
    window.clearInterval(this.timerSocket1)
    console.log('leave one')
  },
  methods: {
    // 用户点击操作-充电
    chargeClick: function () {
      console.log('充电')
      console.log(this.selectedTime)
      this.disableChargeBt = true
      this.loadingFlag = true
      if (this.selectedTime === null || this.selectedTime === '') {
        alert('请选择充电时间')
        return
      }
      if (this.chargingFlag === 0) {
        this.backSocketOpen()
      }
      if (this.chargingFlag === 1) {
        this.backSocketClose()
      }
    },
    // 用户点击操作-充值
    rechargeClick: function () {
      console.log('recharge')
      Routers.push({ path: '/recharge' })
    },
    // 充电时间选择点击
    checkerItemClick: function (itemValue, itemDisabled) {
      console.log(itemValue)
      console.log(itemDisabled)
    },
    // 开启定时器1，每隔两分钟查询指定插座上的最新数据
    queryLoop1: function () {
      // 停止定时器
      window.clearInterval(this.timerSocket1)
      window.clearInterval(this.timerSocket2)
      this.timerSocket1 = window.setInterval(this.queBackInfoTime, 120000)
    },
    // 开启定时器2，每隔5s查询指定插座上的最新数据，这一定时器是为了防止插座没插好，10s后设备上报信息，页面需要及时更新
    queryLoop2: function () {
      // 停止定时器
      window.clearInterval(this.timerSocket1)
      window.clearInterval(this.timerSocket2)
      this.timerSocket2 = window.setInterval(this.queBackInfoTime, 3000)
    },
    // 定时查询内容
    queBackInfoTime: function () {
      if (this.chargingFlag === 1) {
        // 获取插座实时功率
        this.backPowerCurrentInfo()
        // 定时查询充电中的插座数据
        this.backSocketInfoQue()
      }
    },
    alertHide: function () {
      if (this.alertContent === '请先绑定手机号') {
        Routers.push({ path: '/bindPhone' })
        return
      }
      if (this.alertContent === '插座所属充电柱不在线') {
        Routers.push({ path: '/user' })
        return
      }
      if (this.alertContent === '余额不足，请充值') {
        Routers.push({ path: '/recharge' })
        return
      }
      // 其他情况，充电桩、插座异常，提示后跳转到个人中心
      if (this.alertContent !== '充值费用只限于充电，不能退还哦' || this.alertContent !== '当前插座已被占用！ \n 请使用其他插座充电' || this.alertContent !== '当前插座异常！ \n 请使用其他插座充电') {
        Routers.push({ path: '/user' })
      }
    },
    /*
    **  **********  API调用相关函数  **********
    */
    // 获取该插头的数据，电站名、插座名和使用状态、用户余额
    backSocketInfo: function () {
      alert('socketpowerstart')
      // 充电桩名称，插头编号，充电时间，充电功率，消费金额
      back.chargePowerQue(this.socketUid).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.pileLocation = response.data.powerStationName
          this.socketLocation = response.data.powerSocketName
          this.remainder = response.data.balance
          this.bindPhone = response.data.bind
          if (response.data.state === 0) {
            this.chargingFlag = 0
            this.buttonContent = '开始充电'
            this.disableChargeBt = false
          } else if (response.data.state === 2) {
            this.chargingFlag = 1
            this.buttonContent = '断开充电'
            this.disableChargeBt = false
          } else if (response.data.state === 3) {
            this.chargingFlag = 1
            this.buttonContent = '正在使用中'
            this.disableChargeBt = true
            this.alertContent = '当前插座已被占用！ \n 请使用其他插座充电'
            this.alertShow = true
          } else {
            this.chargingFlag = 0
            this.buttonContent = '插座异常'
            this.disableChargeBt = true
            this.alertContent = '当前插座异常！ \n 请使用其他插座充电'
            this.alertShow = true
          }
          if (response.data.state === 2 || response.data.state === 3) {
            // 获取插座实时功率
            this.backPowerCurrentInfo()
            // 定时查询充电中的插座数据
            this.backSocketInfoQue()
          }
          console.log(response.data)
          alert(response.data.state)
        } else {
          alert('PowerERR')
          this.chargingFlag = 0
          this.buttonContent = '提示'
          this.disableChargeBt = true
          this.alertContent = response.error
          this.alertShow = true
          console.log(response.error)
        }
      }.bind(this))
    },
    // 获取功率对应价格区间
    backPowerPriceInfo: function () {
      alert('priceStart')
      // 获取功率对应的价格区间
      back.chargePowerRangeQue(this.socketUid).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          let powerInfo = []
          if (response.data !== undefined) {
            for (let index = 0; index < response.data.length; index++) {
              let powerItem = {}
              powerItem.id = index + 1
              powerItem.powerMin = response.data[index].min
              powerItem.powerMax = response.data[index].max
              powerItem.powerRange = `${response.data[index].min}≤功率≤${response.data[index].max}`
              powerItem.powerPrice = `${response.data[index].price}`
              powerInfo[index] = powerItem
            }
          }
          this.powerExplains = powerInfo
          // 改变scroller价格列表宽度
          document.getElementsByClassName('powerBox')[0].style.width = this.powerExplains.length * 150 + 'px'
          // 组件重新渲染
          this.$nextTick(() => {
            console.log(this)
            this.$refs.scroller.reset()
          })
        } else {
          alert('PowerRangeERR')
          console.log(response.error)
        }
      }.bind(this))
    },
    // 获取插座实时功率
    backPowerCurrentInfo: function () {
      alert('PowerCurrent')
      // 获取功率对应的价格区间
      back.chargePowerCurrentQue(this.socketUid).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.powerNow = response.data.currentPower
          if (this.powerNow < this.powerExplains[0].powerMin || this.powerNow > this.powerExplains[this.powerExplains.length - 1].powerMax) {
            alert('不在功率区间内')
            this.powerPrice = '?'
            return
          }
          for (let index = 0; index < this.powerExplains.length; index++) {
            if (this.powerNow >= this.powerExplains[index].powerMin && this.powerNow <= this.powerExplains[index].powerMax) {
              this.powerPrice = this.powerExplains[index].powerPrice
              break
            }
          }
        } else {
          alert('PowerCurrentERR')
          this.chargingFlag = 0
          this.buttonContent = '提示'
          this.disableChargeBt = true
          this.alertContent = response.error
          this.alertShow = true
          console.log(response.error)
        }
      }.bind(this))
    },
    // 定时查询充电中的插座数据
    backSocketInfoQue: function () {
      alert('SocketInfo')
      // 获取功率对应的价格区间
      back.chargeSocketInfoQue(this.socketUid).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.chargeTime = response.data.minutes
          this.costNumber = response.data.cost
          this.remainder = response.data.balance
          if (response.data.state === 0) {
            this.chargingFlag = 0
            this.buttonContent = '开始充电'
            this.disableChargeBt = false
          } else if (response.data.state === 2) {
            this.chargingFlag = 1
            this.buttonContent = '断开充电'
            this.disableChargeBt = false
          } else if (response.data.state === 3) {
            this.chargingFlag = 1
            this.buttonContent = '正在使用中'
            this.disableChargeBt = true
            this.alertContent = '当前插座已被占用！ \n 请使用其他插座充电'
            this.alertShow = true
          } else {
            this.chargingFlag = 0
            this.buttonContent = '插座异常'
            this.disableChargeBt = true
            this.alertContent = '当前插座异常！ \n 请使用其他插座充电'
            this.alertShow = true
          }
        } else {
          alert('SocketInfoERR')
          this.chargingFlag = 0
          this.buttonContent = '提示'
          this.disableChargeBt = true
          this.alertContent = response.error
          this.alertShow = true
          console.log(response.error)
        }
      }.bind(this))
    },
    // 开始充电
    backSocketOpen: function () {
      alert('SocketOpen')
      if (!(this.bindPhone)) {
        this.alertContent = '请先绑定手机号'
        this.alertShow = true
        return
      }
      // if (this.remainder <= 0) {
      //   this.alertContent = '您的账户余额不足，请充值！'
      //   this.alertShow = true
      //   this.loadingFlag = false
      //   this.disableChargeBt = false
      // }
      let param = {}
      param.uid = this.socketUid
      param.type = this.selectedTime.type
      // 获取功率对应的价格区间
      back.chargeSocketOpen(param).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.loadingFlag = false
          this.disableChargeBt = false
          this.chargingFlag = 1
          this.buttonContent = '断开充电'
          this.timerSocket3 = window.setTimeout(this.queryLoop1, 60000)
          this.queryLoop2()
          // 获取插座实时功率
          this.backPowerCurrentInfo()
          // 定时查询充电中的插座数据
          this.backSocketInfoQue()
        } else {
          this.loadingFlag = false
          this.disableChargeBt = false
          this.alertTitle = '提示'
          this.alertContent = response.error
          this.alertShow = true
          alert('SocketOpenERR')
          this.chargingFlag = 0
          this.buttonContent = '开始充电'
          console.log(response.error)
        }
      }.bind(this))
    },
    // 停止充电
    backSocketClose: function () {
      alert('SocketClose')
      // 获取功率对应的价格区间
      back.chargeSocketClose(this.socketUid).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          this.loadingFlag = false
          this.disableChargeBt = false
          this.chargingFlag = 0
          this.buttonContent = '开始充电'
        } else {
          alert('SocketCloseERR')
          this.loadingFlag = false
          this.disableChargeBt = false
          this.alertTitle = '提示'
          this.alertContent = response.error
          this.alertShow = true
          this.chargingFlag = 1
          this.buttonContent = '断开充电'
          console.log(response.error)
        }
      }.bind(this))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chargePage {
  height: 100%;
}
.userDisplay {
  margin-bottom: 60px;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.time-item {
  width: 25%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 10px;
  margin-bottom: 5px;
}
.time-item-selected {
  border-color: #ff4a00;
}
.button {
  width: 350px;
  margin-top: 20px;
}
.button1 {
  width: 60px;
  position: relative;
  float: right;
  margin: 3px;
  margin-right: 10px;
  height: 30px;
  font-size: 15px;
  line-height: 20px;
}
.img {
  width: 40px;
  height: auto;
}
.imageCss {
  width: 40px;
  height: auto;
}
.recharge {
  height: 30px;
  margin-top: 10px;
}
.rechargep {
  position: relative;
  float: left;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.powerBox {
  height: 40px;
  position: relative;
  width: 490px;
}
.powerBox-item {
  width: 110px;
  height: 50px;
  border-radius: 10%;
  border-width: 5px;
  border-color: aquamarine;
  background-color: rgb(250, 249, 167);
  display:inline-block;
  margin-left: 15px;
  margin-top: 10px;
  font-size: 12px;
  position: relative;
  float: left;
  text-align: center;
  line-height: 25px;
  color: #f74c31;
}
.powerBox-item:first-child {
  margin-left: 0;
}
.shuoming {
  font-size: 12px;
  margin-bottom: 56px;
  margin-left: 10px;
}
.vux-divider {
  padding: 0px 0px;
}
.chargePage >>> .vux-label {
  width: auto!important;
}
.chargePage >>> .vux-cell-bd p {
  display: inline;
}
</style>

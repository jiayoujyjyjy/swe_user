<template>
  <div class="comPowerStationPage">
    <group title="常用电站列表">
      <panel :list="list" :type="type" @on-click-item="showModule"></panel>
      <x-dialog v-model="showDialogStyle" :hide-on-blur="true" :dialog-style="{'max-width': '100%', width: '80%', height: '50%', 'background-color': 'transparent'}">
        <div class="tanChuang">
          <p>插座状态</p>
          <div class="main">
            <grid :cols="4" :show-lr-borders="false">
              <grid-item class="dan" v-for="item in socketItems" :key="item.id" :label="item.value" @on-item-click="socketItemClick(item)">
                <img slot="icon" :src="item.imgsrc">
              </grid-item>
            </grid>
          </div>
          <div class="socketDialog" @click="showDialogStyle=false">
            <span class="vux-close">确定</span>
          </div>
        </div>
      </x-dialog>
    </group>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastContent" position="bottom"></toast>
    <div v-transfer-dom>
      <alert v-model="alertShow" title="提示" :content="alertContent"></alert>
    </div>
  </div>
</template>

<script>
import { XDialog, Group, Panel, Grid, GridItem, Alert, Toast } from 'vux'
import { back } from 'api'

export default {
  name: 'comPowerStation',
  components: {
    Group,
    Panel,
    XDialog,
    Grid,
    GridItem,
    Alert,
    Toast
  },

  data () {
    return {
      msg: 'comPowerStation Page',
      showDialogStyle: false,
      alertShow: false,
      alertContent: '当前充电桩异常 \n 请选择其他充电桩',
      type: '1',
      socketLocationinfo: '',
      showPositionValue: false,
      toastContent: '当前插座已被占用',
      sn: null,
      // 充电桩列表
      list: [],
      // 插座列表
      socketItems: [{
        sn: null,
        id: 1,
        uid: '',
        used: true,
        imgsrc: '/static/socketon.png',
        value: '1'
      }]
    }
  },
  created: function () {
    console.log('comPowerStation')
    // 列表数据渲染
    this.getStationUsual()
  },
  methods: {
    // 列表数据渲染
    getStationUsual: function () {
      back.usualPowerQue().then(function (response) {
        console.log(response)
        let stationInfo = []
        if (response.data !== undefined) {
          for (let i = 0; i < response.data.length; i++) {
            let powerItem = {}
            powerItem.sn = response.data[i].sn
            powerItem.title = response.data[i].name
            let total = response.data[i].total
            let used = response.data[i].used
            let descTest = used + '使用/' + total + '插座'
            powerItem.desc = descTest
            powerItem.state = response.data[i].state
            stationInfo[i] = powerItem
            if (powerItem.state === 1 || powerItem.state === '1') {
              powerItem.src = '/static/socketAlarm.png'
            } else {
              powerItem.src = '/static/socket.png'
            }
          }
        }
        this.list = stationInfo
      }.bind(this))
    },
    // 点击充电桩
    showModule: function (items) {
      if (items.state === 1 || items.state === '1') {
        this.alertShow = true
        return
      }
      console.log(items)
      back.socketListQue(items).then((response) => {
        console.log(response)
        let socketInfo = []
        if (response.errno === 0) {
          console.log('lalalllalalalala')
          for (let j = 0; j < response.data.length; j++) {
            var socketItem = {}
            socketItem.id = response.data[j].id
            socketItem.used = response.data[j].used
            socketItem.uid = response.data[j].uid
            // 插座的状态信息判断
            if (response.data[j].used === 0) {
              socketItem.imgsrc = '/static/socketon.png'
              socketItem.value = socketItem.id + ' 空闲'
            } else if (response.data[j].used === 2) {
              socketItem.imgsrc = '/static/socketoff.png'
              socketItem.value = socketItem.id + ' 正在使用'
            } else if (response.data[j].used === 3) {
              socketItem.imgsrc = '/static/socketoff.png'
              socketItem.value = socketItem.id + ' 他人在用'
            } else if (response.data[j].used >= 4) {
              socketItem.imgsrc = '/static/socketerr.png'
              socketItem.value = socketItem.id + ' 异常'
            } else {
              return
            }
            socketInfo[j] = socketItem
          }
        }
        this.socketItems = socketInfo
        this.socketLocationinfo = items.title
        this.sn = items.sn
        this.showDialogStyle = true
      })
    },
    // 点击插座
    socketItemClick: function (items) {
      console.log('12')
      console.log(items)
      this.$store.commit('setPileSn', items.id)
      this.$store.commit('setSocketId', items.value)
      this.$store.commit('setChargeSocketUid', items.uid)
      this.$store.commit('setsocketLocationinfo', this.socketLocationinfo) // 无用
      console.log(this.socketLocationinfo)
      if (items.used === 0 || items.used === 2) {
        this.$router.push({ path: '/chargePage' })
      } else if (items.used === 3) {
        console.log('其他人在用')
        this.toastContent = '当前插座被占用'
        this.showPositionValue = true
      } else {
        this.toastContent = '当前插座异常'
        this.showPositionValue = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comPowerStationPage {
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
.tanChuang {
  background: white;
  width: 90%;
  position: relative;
  float: left;
  left:5%;
  margin-top: 8%;
}
.dan {
  background: rgb(248, 239,239);
  text-align: center;
  display: block;
}
.socketDialog {
  height: 30px;
  padding-top: 10px;
}
.comPowerStationPage >>> a {
  text-decoration: none;
}
.comPowerStationPage >>> .weui-panel__bd {
  height: 70%;
}
</style>

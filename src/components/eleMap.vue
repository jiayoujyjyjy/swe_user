<template>
  <div class="home">
      <flexbox orient="vertical">
        <flexbox-item :span="1/2">
          <div id="mapPage">
            <div id="allmap" >
              <h3>地图显示</h3>
            </div>
          </div>
        </flexbox-item>
        <flexbox-item :span="1/2">
            <group >
              <panel class="panelcss" :list="chargePilelist" :type="type" @on-click-item="pileItemClick"></panel>
            </group>
        </flexbox-item>
      </flexbox>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '80%', height: '50%', 'background-color': 'transparent'}">
      <div class="tan">
        <p>插座状态</p>
        <div class="main">
          <grid :cols="4" :show-lr-borders="false">
            <grid-item v-for="item in socketItems" :key="item.id" :label="item.value" class="dan"  @on-item-click="socketItemClick(item)">
              <img slot="icon" :src="item.imgsrc">
            </grid-item>
          </grid>
        </div>
        <div class="socketDialog" @click="showDialogStyle=false">
          <span class="vux-close">确定</span>
        </div>
      </div>
    </x-dialog>
    <x-dialog v-model="showDialog" hide-on-blur :dialog-style="{'max-width': '100%', width: '50%', height: '15%'}">
      <div>
        <div style="padding: 20px 0 20px 0;border-bottom: 1px solid gray" @click="openLoca">我要导航
        </div>
        <div style="margin: 20px 0;" @click="backSocketListQue">
          我要充电
        </div>
      </div>
    </x-dialog>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastContent" position="bottom"></toast>
    <div v-transfer-dom>
      <alert v-model="alertShow" title="提示" :content="alertContent"></alert>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_ANCHOR_BOTTOM_RIGHT from 'BMAP_ANCHOR_BOTTOM_RIGHT'
import BMAP_ANCHOR_TOP_LEFT from 'BMAP_ANCHOR_TOP_LEFT'
import Routers from '../router'
import { back } from 'api'
import { Flexbox, FlexboxItem, XDialog, Group, Panel, Grid, GridItem, Toast, Alert } from 'vux'

export default {
  name: 'elemap',
  data () {
    return {
      map: null,
      locationLabel: '我的位置',
      lon: 120, // 当前位置
      lat: 30,
      navigationlon: null, // 当行目标的位置
      navigationlat: null,
      navigationAddress: '',
      addressMe: '', // 自己当前地址信息
      msg: 'elemap Page',
      showDialogStyle: false,
      showDialog: false,
      showPositionValue: false,
      toastContent: '当前插座已被占用',
      type: '5',
      chargePileSn: '',
      alertShow: false,
      alertContent: '当前充电桩异常 \n 请选择其他充电桩',
      // 充电桩信息
      chargePileInfo: [{
        location: '',
        lon: 120,
        lat: 30,
        totle: '',
        used: 2,
        socket: [{
          power: 45,
          time: '2018.4.3',
          state: '1'
        }]
      }],
      // 充电桩列表
      chargePilelist: [{
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩4',
        desc: '距离约78m',
        id: 1,
        sn: 'ffddee000001',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }, {
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩1@',
        desc: '距离约78m',
        id: 2,
        sn: 'ffddee000002',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }, {
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩2@',
        desc: '距离约78m',
        id: 3,
        sn: '',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }, {
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩2',
        desc: '距离约78m',
        id: 4,
        sn: '',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }, {
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩2',
        desc: '距离约78m',
        id: 5,
        sn: '',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }, {
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '孵化器园区充电桩2',
        desc: '距离约78m',
        id: 6,
        sn: '',
        state: 0,
        address: '',
        location: {
          lat: '',
          lon: '',
          ele: ''
        },
        meta: {
          source: '16插座',
          date: '',
          other: '慢充'
        }
      }],
      // 插座列表
      socketItems: [{
        id: 1,
        used: 0,
        uid: '',
        imgsrc: '/static/socketon.png',
        value: '1'
      }, {
        id: 2,
        used: 1,
        uid: '',
        imgsrc: '/static/socketoff.png',
        value: '2'
      }, {
        id: 3,
        used: 0,
        uid: '',
        imgsrc: '/static/socketon.png',
        value: '3'
      }]
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    XDialog,
    Grid,
    GridItem,
    Group,
    Panel,
    Toast,
    Alert
  },
  computed: {
    configFlag () {
      return this.$store.state.wechat.wx_configFlag
    }
  },
  watch: {
    // 设备列表刷新
    configFlag: function (val) {
      if (val) {
        alert('flag')
        // 设备地理位置信息获取
        this.location()
        // wx配置标志位置false，已刷新
        this.$store.commit('setConfigFlag', false)
      }
    }
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    this.$store.state.wechat.wx_configFlag = false
    console.log('elemap')
    var url = this.$store.state.desUrl
    console.log(url)
    var urlcode = url.split('#')[0]
    // this.backSdkGet(urlcode)
    this.$store.dispatch('getWeChatSignature', urlcode)
    this.chargePilelist = []
    this.socketItems = []
  },
  mounted: function () {
    // setTimeout(this.location(), 500)
  },
  methods: {
    // 点击充电桩
    pileItemClick: function (item) {
      if (item.state === 1 || item.state === '1') {
        this.alertContent = '当前充电桩异常 \n 请选择其他充电桩'
        this.alertShow = true
        return
      }
      console.log(item)
      this.chargePileSn = item.sn
      this.navigationlon = item.location.lon
      this.navigationlat = item.location.lat
      this.navigationAddress = item.address
      this.showDialogStyle = false
      this.showDialog = true
      // this.backSocketListQue()
    },
    // 点击插座
    socketItemClick: function (item) {
      console.log('12')
      this.$store.commit('setPileSn', item.id)
      this.$store.commit('setSocketId', item.value)
      this.$store.commit('setChargeSocketUid', item.uid)
      // var url = document.URL
      // var urlcode = url.split('#')[1]
      console.log(item)
      if (item.used === 0 || item.used === 2) {
        Routers.push({ path: '/chargePage' })
      } else if (item.used === 3) {
        alert('当前插座被占用')
        this.toastContent = '当前插座被占用'
        this.showPositionValue = true
      } else {
        alert('当前插座异常')
        this.toastContent = '当前插座异常'
        this.showPositionValue = true
      }
    },
    // 通过微信接口获取位置
    location: function () {
      console.log('location')
      var payload = {}
      payload.success_callback = this.loca
      payload.fail_callback = this.fail
      this.$store.dispatch('queLocation', payload)
    },
    // 获取位置回调函数
    loca: function (res) {
      alert(res)
      console.log('微信位置回调返回')
      console.log(res)
      // alert(res.latitude)
      // alert(res.longitude)
      this.lon = res.longitude
      this.lat = res.latitude
      var point = new BMap.Point(this.lon, this.lat)
      var convertor = new BMap.Convertor()
      var pointArr = []
      pointArr.push(point)
      var vueNum = this
      // 坐标转换完之后的回调函数
      var translateCallback = function (data) {
        if (data.status === 0) {
          console.log(data)
          vueNum.lon = data.points[0].lng
          vueNum.lat = data.points[0].lat
          setTimeout(vueNum.mapinit(), 200)
          setTimeout(vueNum.backChargePlieQue(), 300)
        }
      }
      convertor.translate(pointArr, 1, 5, translateCallback)
    },
    fail: function () {
      console.log('定位关闭')
      this.alertContent = '请打开手机定位！'
      this.alertShow = true
    },
    // 打开地图导航
    openLoca: function () {
      this.showDialog = false
      console.log('op')
      var payload = {
        latitude: parseFloat(this.navigationlat), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(this.navigationlon), // 经度，浮点数，范围为180 ~ -180。
        name: this.navigationAddress, // 位置名
        address: this.navigationAddress, // 地址详情说明
        scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      }
      this.$store.dispatch('openLocation', payload)
    },
    // 地图初始化
    mapinit: async function () {
      // 创建Map实例
      this.map = new BMap.Map('allmap')
      var point = new BMap.Point(this.lon, this.lat)
      this.map.centerAndZoom(point, 12)
      // 根据坐标解析获取地理位置信息
      // let addMe
      // let geoc = new BMap.Geocoder()
      // geoc.getLocation(point, function (rs) {
      //   var addComp = rs.addressComponents
      //   addMe = addComp.province + addComp.city + addComp.district
      // })
      // 左上角，添加默认缩放平移控件
      var topleftnavigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT})
      this.map.addControl(topleftnavigation)// 添加平移缩放控件
      this.addmarker()
      // var crl = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(110, 5)})
      // this.map.addControl(crl)
      // var bsl = this.map.getBounds()
      // let locationContent = '当前位置：' + this.addressMe
      // crl.addCopyright({id: 1, content: locationContent, bounds: bsl})
      // 设置版权标识
      var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT})
      this.map.addControl(cr)
      var bs = this.map.getBounds()
      cr.addCopyright({id: 1, content: '只显示周边10km范围内的电站', bounds: bs})
    },
    // 向地图中添加中心坐标标注点
    addmarker: function () {
      this.map.clearOverlays()
      var myIcon = new BMap.Icon('/static/me.png', new BMap.Size(32, 32))
      var marker = new BMap.Marker(new BMap.Point(this.lon, this.lat), {icon: myIcon})
      this.map.addOverlay(marker)
      var label = new BMap.Label(this.locationLabel, { offset: new BMap.Size(20, -10) })
      marker.setLabel(label)
    },
    // 向地图中添加附近坐标点标注点
    addmarkerNearby: function (point, locat) {
      var point2 = new BMap.Point(point.lon, point.lat)
      console.log('附近电站BMAP')
      console.log(point2)
      var marker
      if (locat.state === 1 || locat.state === '1') {
        var newIcon = new BMap.Icon('/static/markeroffline.png', new BMap.Size(32, 32))
        marker = new BMap.Marker(point2, {icon: newIcon})
      } else {
        marker = new BMap.Marker(point2)
      }
      this.map.addOverlay(marker)
      var opts = {
        width: 200,
        height: 60,
        title: '',
        enableMessage: true,
        message: ''
      }
      var infoWindow = new BMap.InfoWindow(locat.location, opts)
      marker.addEventListener('click', function () {
        this.map.openInfoWindow(infoWindow, point2)
      })
    },
    // 向地图中添加附近充电桩
    addChargeNearby: function (chargeList) {
      console.log('附近电站列表')
      console.log(chargeList)
      if (chargeList.length !== undefined) {
        for (let index = 0; index < chargeList.length; index++) {
          let point = {}
          let locat = {}
          point.lat = chargeList[index].location.lat
          point.lon = chargeList[index].location.lon
          locat.location = chargeList[index].address
          locat.state = chargeList[index].state
          // 向地图中添加附近坐标点标注点
          this.addmarkerNearby(point, locat)
        }
      }
    },
    //
    // *********API请求***********
    //
    // 获取附近充电桩信息
    backChargePlieQue: function () {
      console.log('getchargePlieQue')
      let param = {}
      param.lat = this.lat
      param.lon = this.lon
      back.nearbyPowerQue(param).then(function (response) {
        console.log('附近电站')
        console.log(response)
        if (response.errno === 0) {
          let chargePile = []
          if (response.data !== undefined) {
            for (let index = 0; index < response.data.length; index++) {
              let chargeItem = {}
              chargeItem.fallbackSrc = ''
              chargeItem.title = response.data[index].name
              chargeItem.desc = '约' + response.data[index].distance
              chargeItem.id = index + 1
              chargeItem.sn = response.data[index].sn
              chargeItem.state = response.data[index].state
              chargeItem.address = response.data[index].address
              chargeItem.location = response.data[index].latitude
              chargeItem.meta = {}
              chargeItem.meta.source = response.data[index].total + '插座'
              chargeItem.meta.data = ''
              chargeItem.meta.other = '慢充'
              chargePile[index] = chargeItem
              if (chargeItem.state === 1 || chargeItem.state === '1') {
                chargeItem.src = '/static/socketAlarm.png'
              } else {
                chargeItem.src = '/static/socket.png'
              }
            }
          }
          this.chargePilelist = chargePile
          // 向地图中添加附近充电桩
          this.addChargeNearby(this.chargePilelist)
        } else {
          console.log(response.error)
        }
      }.bind(this))
    },
    backSocketListQue: function () {
      console.log('socketListQue')
      let param = {}
      param.sn = this.chargePileSn
      back.socketListQue(param).then(function (response) {
        console.log(response)
        if (response.errno === 0) {
          let socketInfo = []
          if (response.data !== undefined) {
            for (let index = 0; index < response.data.length; index++) {
              let socketItem = {}
              socketItem.id = response.data[index].id
              socketItem.used = response.data[index].used
              socketItem.uid = response.data[index].uid
              // socketItem.value = response.data[index].id
              // if (socketItem.used === 0) {
              //   socketItem.imgsrc = '/static/socketon.png'
              // } else if (socketItem.used === 2 || socketItem.used === 3) {
              //   socketItem.imgsrc = '/static/socketoff.png'
              // } else {
              //   socketItem.imgsrc = '/static/socketerr.png'
              // }
              // 插座的状态信息判断
              if (socketItem.used === 0) {
                socketItem.imgsrc = '/static/socketon.png'
                socketItem.value = socketItem.id + ' 空闲'
              } else if (socketItem.used === 2) {
                socketItem.imgsrc = '/static/socketoff.png'
                socketItem.value = socketItem.id + ' 正在使用'
              } else if (socketItem.used === 3) {
                socketItem.imgsrc = '/static/socketoff.png'
                socketItem.value = socketItem.id + ' 他人在用'
              } else if (socketItem.used >= 4) {
                socketItem.imgsrc = '/static/socketerr.png'
                socketItem.value = socketItem.id + ' 异常'
              } else {
                return
              }
              socketInfo[index] = socketItem
            }
          }
          this.socketItems = socketInfo
          this.showDialog = false
          this.showDialogStyle = true
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
a {
  color: #42b983;
}
.home {
  height: 100%;
  padding-top: 46px;
  box-sizing: border-box;
}
.vux-flexbox {
  height: 100%;
}
.vux-flexbox .vux-flexbox-item {
  overflow-y: auto;
}
#mapPage {
  text-align: center;
  color: #fff;
  background-color: #bbbeba;
  border-radius: 4px;
  background-clip: padding-box;
  height: 100%;
}
#allmap {
  text-align: center;
  color: #fff;
  background-color: #bbbeba;
  border-radius: 4px;
  background-clip: padding-box;
  height: 100%;
}
.cardcss {
  height: 60px;
}
a.weui-media-box {
  height: 40px;
}
.tan {
  background: white;
  width: 90%;
  position: relative;
  float: left;
  left:5%;
  margin-top: 8%;
}
.dan {
  display: block;
  text-align: center;
  background:rgb(248, 239, 239);
}
.socketDialog {
  height: 30px;
  padding-top: 10px;
}
.home >>> .weui-media-box__hd {
  height: 40px;
  width: 40px;
}
.home >>> .weui-media-box__title {
  font-size: 16px;
}
.home >>> .weui-media-box {
  padding: 10px 15px 0 15px;
}
.home >>> .weui-media-box__bd {
  display: flex;
  align-items: center;
}
.home >>> p {
  margin: auto;
}
.home >>> h4 {
  margin: auto;
}
</style>

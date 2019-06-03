<template>
  <div class="chargingPilePage">
    <group title="正在充电">
      <panel :list="list" :type="type" @on-click-item="pileItemClick"></panel>
    </group>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, Panel } from 'vux'
import { back } from 'api'

export default {
  name: 'chargingPile',
  components: {
    Group,
    Panel
  },
  data () {
    return {
      msg: 'chargingPile Page',
      type: '3',
      list: [{
        src: '/static/socket.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '插座：插座14',
        desc: '',
        url: '',
        uid: ''
      }]
    }
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    console.log('chargingPile')
    this.getuser()
  },
  methods: {
    getuser: function () {
      back.chargingNowQue().then(function (response) {
        console.log(response)
        this.list = []
        if (response.errno === 0) {
          for (let i = 0; i < response.data.length; i++) {
            let obj = {}
            obj.src = '/static/socket.png'
            obj.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
            obj.title = response.data[i].stationName + '：' + response.data[i].socketName
            obj.desc = ''
            obj.url = ''
            obj.uid = response.data[i].uid
            this.list.push(obj)
          }
          console.log(this.list)
        }
      }.bind(this))
    },
    pileItemClick: function (item) {
      console.log('pileItemClick')
      console.log(item)
      this.$store.commit('setChargeSocketUid', item.uid)
      Routers.push({ path: '/chargePage' })
      // if (item.url !== '') {
      //   Routers.push({ path: '/' })
      // }
    },
    // 后台查询正在充电电站信息
    backChargingQue: function () {
      console.log('backChargingQue')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chargingPilePage {
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
</style>

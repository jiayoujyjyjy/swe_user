<template>
  <div class="rechargeRecordPage">
    <group title="充值记录">
      <panel :list="list" :type="type"></panel>
    </group>
    <p v-if="pages1 < 0" @click="nextPage" style="text-align: center">{{tip}}</p>
    <p v-else-if="pages1 > 0" @click="nextPage" style="text-align: center">{{tip}}</p>
    <p v-else @click="nextPage" style="text-align: center">...</p>
  </div>
</template>

<script>
import { Group, Panel } from 'vux'
import { back } from 'api'

export default {
  name: 'user',
  components: {
    Group,
    Panel
  },
  data () {
    return {
      msg: 'user Page',
      tip: '加载更多',
      param: {
        page: 1,
        size: 4
      },
      pages: 0,
      pages1: 0,
      type: '5',
      list: [],
      preList: [],
      replaceList: []
    }
  },
  watch: {
    replaceList: function (val, oldVal) {
      console.log('replaceList changed')
      console.log(this.replaceList)
      this.preList = this.preList.concat(this.replaceList)
      console.log(this.preList)
      this.list = this.preList
    }
  },
  //
  // ********************生命周期*********************
  //
  created: function () {
    console.log('充值记录')
    this.getUser()
  },
  methods: {
    judgeFirstRequest: function () {
      if (this.param.page < this.pages) {
        this.tip = '加载更多'
        this.pages1 = -1
      } else if (this.param.page === this.pages) {
        this.tip = '已加载全部'
        this.pages1 = 1
      } else {
        this.pages1 = 0
      }
    },
    getUser: function () {
      // console.log(11111111)
      // console.log(this.param)
      var param = this.param
      this.getUserTrade(param)
    },
    nextPage: function () {
      var param = this.param
      param.page++
      if (param.page < this.pages) {
        this.tip = '加载更多'
        this.pages1 = -1
        this.getUserTrade(param)
      } else if (param.page === this.pages) {
        this.getUserTrade(param)
        this.tip = '已加载全部'
        this.pages1 = 1
        console.log('这是最后一页')
      } else {
        console.log('无数据')
      }
    },
    getUserTrade: function (param) {
      back.tradeRecordQue(param).then((response) => {
        console.log(response.data)
        if (response.data !== undefined) {
          this.pages = response.data.pages
          this.judgeFirstRequest()
          if (param.page <= response.data.pages) {
            // var tradeInfo = this.list.slice(0) 要后面加个tradeInfo数组的位置判断
            var tradeInfo = []
            // if判断该页面能否容纳自定的size数目
            var sizeNew = response.data.size
            if (response.data.page === response.data.pages) {
              sizeNew = response.data.total - ((response.data.page - 1) * response.data.size)
            }
            for (let pageItem = 0; pageItem < sizeNew; pageItem++) {
              let tradeInfoItem = {}
              tradeInfoItem.src = '/static/wechatPay.png'
              tradeInfoItem.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
              tradeInfoItem.title = '微信支付 +' + response.data.record[pageItem].money + '元'
              tradeInfoItem.desc = response.data.record[pageItem].time
              tradeInfo[pageItem] = tradeInfoItem
            }
            this.replaceList = tradeInfo
          }
        } else {
          this.pages = 0
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rechargeRecordPage {
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

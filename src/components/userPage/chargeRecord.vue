<template>
  <div class="chargeRecordPage">
    <group title="充电记录">
      <panel :list="list" :type="type"></panel>
      <x-button v-if="endflag" class="butn">没有更多</x-button>
      <x-button v-else @click.native="mload" class="butn">加载更多</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Panel, XButton } from 'vux'
import { back } from 'api'

export default {
  name: 'user',
  components: {
    Group,
    Panel,
    XButton
  },
  data () {
    return {
      msg: 'user Page',
      type: '5',
      list: [],
      params: {
        page: 1,
        size: 4
      },
      endflag: 0
    }
  },
  //
  // ***************生命周期*********************
  //
  created: function () {
    this.submit()
  },
  methods: {
    mload () {
      console.log('load page')
      console.log(this.params.page)
      console.log('load size')
      console.log(this.params.size)
      if (!this.endflag) {
        this.params.page++
        this.submit()
      }
    },
    submit () {
      back.chargerRecordQue(this.params).then((response) => {
        console.log('data')
        console.log(response.data)
        console.log(this.params)
        if (this.params.page <= response.data.pages) {
          var sets = this.list.slice(0)
          if (response.data !== undefined) {
            var thsize = response.data.size
            var alsize = response.data.size * response.data.page - response.data.size
            if (response.data.page === response.data.pages) {
              thsize = response.data.total - alsize
              this.endflag = 1
            }
            var thalsize = alsize + thsize
            for (let i = alsize; i < thalsize; i++) {
              let groupInfo = {}
              let ingroup = []
              ingroup.other = '功率：' + response.data.record[i - alsize].power + '瓦'
              ingroup.date = response.data.record[i - alsize].time
              groupInfo.title = '费用：-' + response.data.record[i - alsize].cost
              groupInfo.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532166363108&di=c3f3eae18acce3126e9268d24cdd47d6&imgtype=0&src=http%3A%2F%2Fwww.gzselon.com%2Fupload%2F2016%2FIBI_20160829145820041_IBI.png'
              groupInfo.desc = '充电' + response.data.record[i - alsize].duration + '分钟'
              groupInfo.meta = ingroup
              sets[i] = groupInfo
            }
          }
          this.list = sets
          console.log(this.list)
        } else {
          console.log('最后一页')
          this.endflag = 1
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chargeRecordPage {
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
.butn::after {
  border: none;
}
.chargeRecordPage >>> .weui-media-box_appmsg .weui-media-box__thumb {
  width: 70%;
  max-height: 70%;
  vertical-align: top;
}
.chargeRecordPage >>> .weui-media-box_text .weui-media-box__title {
  margin-bottom: 6px;
  margin: auto;
  float: right;
  color: rgb(182, 0, 0);
}
.chargeRecordPage >>> .weui-media-box {
  padding: 14px;
}
.chargeRecordPage >>> .weui-media-box__desc {
  margin: 1px;
}
.chargeRecordPage >>> .weui-media-box__info {
  margin: auto;
}
.chargeRecordPage >>> .weui-media-box__desc {
  font-size: 14px
}
</style>

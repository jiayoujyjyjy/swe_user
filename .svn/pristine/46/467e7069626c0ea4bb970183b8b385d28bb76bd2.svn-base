<template>
  <div class="aboutMePage">
    <group title="关于我们">
      <panel :list="list" :type="type"></panel>
    </group>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, Panel } from 'vux'
import { back } from 'api'

export default {
  name: 'aboutMePage',
  components: {
    Group,
    Panel
  },
  data () {
    return {
      msg: 'user Page',
      type: '3',
      list: [{
        src: '/static/user.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '凌云',
        desc: '我的电话号码是：123456',
        url: '/component/cell'
      }, {
        src: '/static/user.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '凌云',
        desc: '我的电话号码是：123456',
        url: '/component/cell'
      }, {
        src: '/static/user.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '凌云',
        desc: '我的电话号码是：123456',
        url: '/component/cell'
      }]
    }
  },
  created: function () {
    console.log('user')
    back.urltestQue().then(function (response) {
      var url = response.data.address
      window.location.href = url
    })
  },
  methods: {
    tohello: function () {
      Routers.push({ path: '/' })
    },
    getuser: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aboutMePage {
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

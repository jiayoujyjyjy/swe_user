<template>
  <div class="family">
    <group title="请输入插座二维码下方序列号">
      <x-input title="序列号" v-model="uidInput"></x-input>
    </group>
    <group title="请选择插座序号">
      <selector v-model="selectedNum" title="插座序号" :options="numList" @on-change="onChange"></selector>
    </group>
    <br>
    <x-button plain type="primary" @click.native="toChargePage" class="button">确定</x-button>
    <div v-transfer-dom>
      <alert v-model="tipShow" title="提示" :content="tipContent"></alert>
    </div>
  </div>
</template>

<script>
import Routers from '@/router'
import { Group, XInput, XButton, Alert, Selector } from 'vux'
import { back } from 'api'

export default {
  name: 'familyDiv',
  components: {
    Selector,
    Group,
    XInput,
    XButton,
    Alert
  },
  data () {
    return {
      uidInput: '',
      // numList: ['1', '2', '3', '4', '5', '6', '7', '8'],
      numList: [1, 2, 3, 4, 5, 6, 7, 8],
      value1: '1',
      selectedNum: 1,
      tipShow: false,
      tipContent: ''
    }
  },
  mounted: function () {
  },
  methods: {
    onChange: function (val) {
      // this.selectedNum = val
    },
    toChargePage: function () {
      if (this.uidInput === '') {
        this.tipContent = '插座序列号不能为空'
        this.tipShow = true
      } else {
        let param = {}
        param.uid = this.uidInput
        param.id = this.selectedNum
        back.socketUidVer(param).then(function (response) {
          if (response.errno === 0) {
            this.$store.commit('setChargeSocketUid', response.data.uid)
            Routers.push({ path: '/chargePage' })
          } else {
            this.tipContent = response.error
            this.tipShow = true
          }
        }.bind(this))
      }
    }
  }
}
</script>

<style scoped>
.family {
  margin-top: 66px;
}
.button {
  width: 90%
}
</style>

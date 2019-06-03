import Vue from 'vue'
import Vuex from 'vuex'
import wechat from './modules/wechat'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    socketData: {},
    message: null,
    token: false,
    userUid: '',
    userName: '',
    headImgUrl: '',
    secUrlSave: '',
    userRole: 'norole',
    desUrl: '',
    pileSn: '',
    socketId: '',
    chargeSocketUid: '',
    backToken: 'notoken',
    typeParm: []
  },
  mutations: {
    setMessage (state, msg) {
      state.message = msg
    },
    setToken (state, msg) {
      state.token = msg
    },
    setUserUid (state, msg) {
      state.userUid = msg
    },
    setUserName (state, msg) {
      state.userName = msg
    },
    setHeadImgUrl (state, msg) {
      state.headImgUrl = msg
    },
    setSecUrlSave (state, msg) {
      state.secUrlSave = msg
    },
    setUserRole (state, msg) {
      state.userRole = msg
    },
    setDesUrl (state, msg) {
      state.desUrl = msg
    },
    setPileSn (state, msg) {
      state.pileSn = msg
    },
    setSocketId (state, msg) {
      state.socketId = msg
    },
    setChargeSocketUid (state, msg) {
      state.chargeSocketUid = msg
    },
    setbackToken (state, msg) {
      state.backToken = msg
    },
    setTypeParam (state, msg) {
      state.typeParam = msg
    }
  },
  actions: {
    userInfo ({commit, dispatch, state}, {data}) {
      console.log(data)
    }
  },
  modules: {
    wechat
  }
})

export default store

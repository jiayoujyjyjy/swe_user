import axios from 'axios'
import store from '../vuex/store'
import { character } from '@/components/config/Character'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.response.use(
  response => {
    var param = store.state.typeParam
    // 进入充电页面有两个大的划分，扫码进入和系统内部进入，扫码进入url会带参数，uid的处理不一样
    if (param.type === 2 && param.uid === '') {
      param.uid = store.state.chargeSocketUid
    }
    if (response.data.errno === 2) {
      console.log('响应拦截')
      return axios({
        url: `http://wx.swehongshi.com/charging/wx/address?type=${param.type}&uid=${param.uid}&time=${character.randomWord(true, 9, 12)}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
        },
        withCredentials: true
      })
        .then((response) => {
          // return response.data
          if (response.data.errno === 0) {
            window.location.href = response.data.data.address
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

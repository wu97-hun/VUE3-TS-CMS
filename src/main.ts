import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

// 注册element-plus组件库（新版本不用）
import { globalRegister } from './global'
// import wjRequest from './service'

// 注册图标

import { setupStore } from './store'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

// 注册图标组件
app.use(globalRegister)
app.use(router)
app.use(store)

// 注册用户重新刷新导致vuex中的数据消失
setupStore()

app.mount('#app')

// 请求返回数据的数据类型
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// 给泛型传入一个数据类型
// wjRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的config')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         return res
//       }
//     }
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

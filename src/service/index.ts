import WJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const wjRequest = new WJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = '123'
      if (token && config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('request success')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('request fail')
      return err
    },
    responseInterceptor: (res) => {
      console.log('response success')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('response fail')
      return err
    }
  }
})

export default wjRequest

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WJRequestInterceptors, WJRequestConfig } from './type'

import { ElLoading } from 'element-plus'

// 设置默认的showLoading值
const DEFAULT_LOADING = true

class WJRequest {
  instance: AxiosInstance
  interceptors?: WJRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: WJRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 定义是否需要loading界面
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 将拦截器保存至config内
    this.interceptors = config.interceptors

    // 使用局部拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    /*
      设置全局拦截器
      注：请求拦截器后进先执行（栈结构），响应拦截器先进先执行（队列结构）
    */
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({ lock: true })
        }
        // console.log('global request interceptor success')
        return config
      },
      (err) => {
        // console.log('global request interceptor fail')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('global response interceptor success')
        if (res.data.returnCode === '-1001') {
          console.log('request error')
        } else {
          return res.data
        }
      },
      (err) => {
        // console.log('global response interceptor fail')
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404 error')
        }
        return err
      }
    )
  }

  // 此处泛型以请求者（需要返回的数据类型）为准
  // config后的泛型主要见./type.ts中的泛型传值
  request<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果config中存在拦截器则对config进行处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 默认存在loading所以只判断设置为false的情况
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }

      // 由于request返回的结果是AxiosResponse类型，所以需要传入泛型T进行修改
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果config中存在拦截器则对res进行处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 需要在每次请求结束后将showLoading设置为初始值否则下一次请求不会显示Loading
          this.showLoading = DEFAULT_LOADING

          // 给Promise返回结果
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WJRequest

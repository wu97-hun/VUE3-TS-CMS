import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 自定义拦截器类型接口
export interface WJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 接口继承axios中得AxiosRequestConfig并且添加拦截器的类型
export interface WJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WJRequestInterceptors<T>
  showLoading?: boolean
}

import type { ILoginState } from './login/type'

// 定义state的类型
export interface IRootState {
  msg: string
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule

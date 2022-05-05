import type { ILoginState } from './login/type'
import type { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

// 定义state的类型
export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule

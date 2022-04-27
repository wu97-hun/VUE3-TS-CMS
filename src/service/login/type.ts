export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

// 由于每次返回的data类型不确定所以使用泛型
export interface IDataType<T = any> {
  code: number
  data: T
}

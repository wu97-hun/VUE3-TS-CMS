import wjRequest from '../index'
import type { IAccount, ILoginResult } from './type'
import type { IDataType } from '../types'

enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  // 给结果传入泛型
  return wjRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account,
    showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return wjRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    // 由于请求头为可选项，在不传入时为undefined所以编译过程会出错
    headers: {
      Authorization: ''
    },
    showLoading: false
  })
}

export function requestUserMenus(id: number) {
  return wjRequest.get<IDataType>({
    url: `${LoginApi.UserMenus}${id}/menu`,
    // 由于请求头为可选项，在不传入时为undefined所以编译过程会出错
    headers: {
      Authorization: ''
    },
    showLoading: false
  })
}

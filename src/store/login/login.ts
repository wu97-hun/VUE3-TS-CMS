import type { Module } from 'vuex'
import type { IRootState } from '../type'
import type { ILoginState } from './type'
import type { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenus
} from '@/service/login/login'
import router from '@/router'
import localCache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menus: {}
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.menus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 账户登录
      const loginResult = await accountLoginRequest(payload)
      const { token, id } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 登录后再根据id请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求用户角色菜单树
      const userMenusResult = await requestUserMenus(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule

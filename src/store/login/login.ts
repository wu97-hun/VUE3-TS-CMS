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
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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
      state.userMenus = userMenus

      // 获得userMenus时映射动态路由
      const routes = mapMenusToRoutes(userMenus)

      // 注册动态路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户得权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
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
      const userMenusResult = await requestUserMenus(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 请求初始化数据(调用root里的action)
      dispatch('getInitialDataAction', null, { root: true })

      // 跳到首页
      router.push('/main')
    },
    // 防止用户重新刷新导致vuex中数据消失
    loadLocalLogin({ commit, dispatch }) {
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

      // 请求初始化数据(调用root里的action)
      dispatch('getInitialDataAction', null, { root: true })
    }
  },
  getters: {}
}

export default loginModule

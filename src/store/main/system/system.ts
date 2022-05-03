import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl (针对不同的pageName请求不同的pageUrl)
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 1.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      // 对传入的pageName处理
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      // 根据pageName修改数据
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  },
  getters: {
    pageListData(state) {
      // 如果需要给getters传参则返回函数
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListDataCount(state) {
      // 如果需要给getters传参则返回函数
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default systemModule

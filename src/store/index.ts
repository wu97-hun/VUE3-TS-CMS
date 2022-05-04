import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 模块
import login from './login/login'
import system from './main/system/system'

import { getPageListData } from '@/service/main/system/system'

import type { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门、角色和菜单数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    login,
    system
  }
})

// 刷新的时候会调用此函数
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 此处获取数据时可能会发生token还未请到的情况
  // store.dispatch('getInitialDataAction')
}

// 项目难点：vuex和ts结合不好
// 当使用原本的useStore创建出的store实例调用子模块时类型无法检测
// 所以使用类型交叉（type IStoreType = IRootState & IRootWithModule）
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 模块
import login from './login/login'
import system from './main/system/system'

import type { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      msg: 'You gotta fight!'
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 项目难点：vuex和ts结合不好
// 当使用原本的useStore创建出的store实例调用子模块时类型无法检测
// 所以使用类型交叉（type IStoreType = IRootState & IRootWithModule）
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

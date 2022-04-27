import { createStore } from 'vuex'
// 模块
import login from './login/login'

import type { IRootState } from './type'

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
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store

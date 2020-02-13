import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
// vuex是数据仓库，分为以下三个
const store = new Vuex.Store({
  state: {
    token: '',
    user: null,
    isUserLogin: false,
    loadingInstance: null
    // vip: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      // 如果有token值，将isUserLogin改为true
      if (token) {
        state.isUserLogin = true
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setLoadingInstance (state, loadingInstance) {
      state.loadingInstance = loadingInstance
    }
    // setVip (state, vip) {
    //   state.vip = vip
    // }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setLoadingInstance ({ commit }, loadingInstance) {
      commit('setLoadingInstance', loadingInstance)
    }
    // setVip ({ commit }, vip) {
    //   commit('setvip', vip)
    // }
  }
})

export default store

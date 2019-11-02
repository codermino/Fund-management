import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATE: 'SET_AUTHENTICATE', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
};

// 相当于data
const state = { // 需要维护的状态
  isAuthenticated: false,  // 是否认证
  user: {}   // 存储用户信息
};

// 相当于computed
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};

// 相当于methods
const mutations = {
  [types.SET_AUTHENTICATE](state, isAuthenticated) {
    if (isAuthenticated)
      state.isAuthenticated = isAuthenticated;
    else
      state.isAuthenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user;
    else
      state.user = {};
  }
};

// 进行的异步操作
const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATE, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATE, false);
    commit(types.SET_USER, null);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

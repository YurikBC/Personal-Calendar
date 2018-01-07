import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    authUser: {}
  },
  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },
  actions: {
    login ({ commit }, { password }) {
    if (password = 'demo') {
      let user = {}
      user.password = password
      user.username = 'yuriy'
      commit('SET_USER', user)
      axios.get('/')
    }
    },
    async logout ({ commit }) {
      await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  }
})

export default store

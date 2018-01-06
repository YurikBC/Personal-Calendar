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
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },
    async login ({ commit }, { password }) {
      try {
        const { data } = await axios.post('/api/login', { password })
        commit('SET_USER', data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async logout ({ commit }) {
      await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  }
})

export default store

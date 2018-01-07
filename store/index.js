import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
require('whatwg-fetch')

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
    async nuxtServerInit ({ commit }, { req }) {
      console.log(req.session.authUser)
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },
    login ({ commit }, { password }) {
    return fetch('/api/login', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password
      })
    })
    .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
    .then((authUser) => {
        console.log(authUser)
        commit('SET_USER', authUser)
    })
    },
    async logout ({ commit }) {
      await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  }
})

export default store

import { api } from 'boot/axios'

const state = {
  token: '',
  authenticated: false
}

// synchronous actions
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setAuthenticated (state, value) {
    state.authenticated = value
  }
}

const actions = {
  async login ({
    commit,
    state
  }, payload) {
    const output = await api.post('/api/login', payload)
    const response = output.data
    if (response.success) {
      commit('setToken', response.data.token)
      commit('setAuthenticated', true)
      api.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
    }
  },
  async logout ({
    commit
  }) {
    commit('setToken', '')
    commit('setAuthenticated', false)
    api.post('/api/logout').then(() => {
      api.defaults.headers.common.Authorization = ''
    })
  }
}

const getters = {
  isAuthenticated: (state) => {
    return state.authenticated
  },
  getToken: (state) => {
    return state.token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

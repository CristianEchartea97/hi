import { api } from 'boot/axios'

const state = {
  token: '',
  authenticated: false,
  userName: '',
  role: '',
  notifications: 0
}

// synchronous actions
const mutations = {
  setNotifications (state, value) {
    state.notifications = value
  },
  setRole (state, value) {
    state.role = value
  },
  setUserName (state, userName) {
    state.userName = userName
  },
  setToken (state, token) {
    state.token = token
  },
  setAuthenticated (state, value) {
    state.authenticated = value
  }
}

const getters = {
  getNotifications: (state) => {
    return state.notifications
  },
  isAuthenticated: (state) => {
    return state.authenticated
  },
  getToken: (state) => {
    return state.token
  },
  getUserName: (state) => {
    return state.userName
  },
  getRole: (state) => {
    return state.role
  }
}

const actions = {
  async login (context, payload) {
    const output = await api.post('/api/login', payload)
    const response = output.data
    if (response.success) {
      context.commit('setToken', response.data.token)
      context.commit('setUserName', response.data.name)
      context.commit('setRole', response.data.role)
      context.commit('setAuthenticated', true)
    }
  },
  async updateNotifications (context) {
    const output = await api.get('/api/user/notifications')
    const response = output.data
    if (!response.success) {
      return
    }
    context.commit('setNotifications', response.data.notifications)
  },
  async logout (context) {
    context.commit('setToken', '')
    context.commit('setAuthenticated', false)
    await api.post('/api/logout')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

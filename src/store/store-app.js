import { api } from 'boot/axios'

const state = {
  clientVersion: null,
  token: '',
  authenticated: false,
  userName: '',
  role: '',
  notifications: 0,
  homePage: '',
  avatar: null,
  background: null
}

// synchronous actions
const mutations = {
  setClientVersion (state, value) {
    state.clientVersion = value
  },
  setAvatar (state, value) {
    state.avatar = value
  },
  setBackground (state, value) {
    state.background = value
  },
  setHomePage (state, value) {
    let homePage
    switch (value) {
      case 'OTTITOAdmin':
        homePage = 'usersHome'
        break
      case 'MainUser':
      default:
        homePage = 'reportsHome'
        break
    }
    state.homePage = homePage
  },
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
  getClientVersion: (state) => {
    return state.clientVersion
  },
  getAvatar: (state) => {
    return state.avatar
  },
  getBackground: (state) => {
    return state.background
  },
  getHomePage: (state) => {
    return state.homePage
  },
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
  updateAppVersion (context, payload) {
    context.commit('setClientVersion', payload)
  },
  async login (context, payload) {
    const output = await api.post('/api/login', payload)
    const response = output.data
    if (response.success) {
      context.commit('setAvatar', response.data.avatar)
      context.commit('setBackground', response.data.background)
      context.commit('setToken', response.data.token)
      context.commit('setUserName', response.data.name)
      context.commit('setRole', response.data.role)
      context.commit('setHomePage', response.data.role)
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
  logout (context) {
    context.commit('setClientVersion', null)
    context.commit('setAvatar', null)
    context.commit('setBackground', null)
    context.commit('setToken', null)
    context.commit('setAuthenticated', false)
    context.commit('setNotifications', 0)
    context.commit('setHomePage', null)
    context.commit('setUserName', null)
    context.commit('setRole', null)
    api.post('/api/logout').then(() => {
      console.log('ByeBye')
    })
  },
  async register (context, payload) {
    const output = await api.post('/api/register', payload)
    const response = output.data
    if (response.success) {
      context.commit('setToken', response.data.token)
      context.commit('setUserName', response.data.name)
      context.commit('setRole', response.data.role)
      context.commit('setAuthenticated', true)
      context.commit('setHomePage', response.data.role)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

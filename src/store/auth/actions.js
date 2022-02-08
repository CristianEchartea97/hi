import { api } from 'boot/axios'

export const doLogin = async ({ commit, dispatch }, payload) => {
  await api.post('api/login', payload).then(response => {
    const token = response.data
    commit('setToken', token)
    api.defaults.headers.common.Authorization = 'JWT ' + token.access
    dispatch('getMe', token)
  })
}

export const signOut = ({ commit }) => {
  console.log('dopasfmopdfmbporwtmbs')
  api.defaults.headers.common.Authorization = ''
  commit('removeToken')
}

export const getMe = async ({ commit }) => {
  commit('setMe', 'sample data')
}

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem('token')
  if (token) {
    await commit('setToken', JSON.parse(token))
    api.defaults.headers.common.Authorization = 'JWT ' + JSON.parse(token).access
    dispatch('getMe', JSON.parse(token))
  } else {
    commit('removeToken')
  }
}

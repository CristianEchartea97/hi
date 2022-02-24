import { boot } from 'quasar/wrappers'
import axios from 'axios'
import packageInfo from '../../package.json'

const api = axios.create({
  baseURL: `${process.env.OTTO_BACKEND_PROTOCOL}://${process.env.OTTO_BACKEND_ADDRESS}:${process.env.OTTO_BACKEND_PORT}/`
})

const externalApi = axios.create()

// https://stackoverflow.com/questions/63100658/add-global-variable-in-vue-js-3
export default boot(({
  app,
  store
}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.applicationVersion = packageInfo.version
  app.config.globalProperties.api = api
  app.config.globalProperties.axios = externalApi
  app.config.globalProperties.author = 'donhk'
  // ^ ^ ^ this will allow you to use this.api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  if (store.getters['xstore/isAuthenticated']) {
    console.log('Patching Auth after reload')
    app.config.globalProperties.api.defaults.headers.common.Authorization = 'Bearer ' + store.getters['xstore/getToken']
  }
})

export { api, externalApi }

import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://150.136.182.124:8081/'
})

// https://stackoverflow.com/questions/63100658/add-global-variable-in-vue-js-3
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.api = api
  app.config.globalProperties.author = 'donhk'
  // ^ ^ ^ this will allow you to use this.api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }

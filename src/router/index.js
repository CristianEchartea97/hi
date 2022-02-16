import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  // if the user is already authenticated redirect them to home
  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.hideForAuth)) {
      const isAuthenticated = store.getters['xstore/isAuthenticated']
      if (isAuthenticated) {
        next({ name: this.$store.getters['xstore/getHomePage'] })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  // if the user is not authenticated, redirect to home
  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireLogin)) {
      if (store.getters['xstore/isAuthenticated']) {
        next()
      } else {
        next({ name: 'login' })
      }
    } else {
      next()
    }
  })

  return Router
})

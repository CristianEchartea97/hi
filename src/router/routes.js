const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      hideForAuth: true
    },
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      hideForAuth: true
    },
    component: () => import('pages/auth/SignUp.vue')
  },
  {
    path: '/missing-pass',
    name: 'missingPass',
    meta: {
      hideForAuth: true
    },
    component: () => import('pages/auth/ForgotPass.vue')
  },
  {
    path: '/app',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireLogin: true },
    children: [
      {
        path: '',
        name: 'reportsHome',
        component: () => import('pages/reports/ReportsHome')
      },
      {
        path: 'wizard',
        name: 'wizardHome',
        component: () => import('pages/wizard/WizardHome')
      },
      {
        path: 'my-files',
        name: 'filesHome',
        component: () => import('pages/files/FilesHome')
      },
      {
        path: 'my-settings',
        name: 'settingsHome',
        component: () => import('pages/settings/SettingsHome')
      },
      {
        path: '',
        name: 'usersHome',
        component: () => import('pages/oa/users/UsersHome')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

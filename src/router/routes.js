const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/auth/SignUp.vue')
  },
  {
    path: '/missing-pass',
    name: 'missingPass',
    component: () => import('pages/auth/ForgotPass.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'reportsHome',
        component: () => import('pages/reports/ReportsHome')
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

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/auth/SignUp.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/missing-pass',
    name: 'missingPass',
    component: () => import('pages/auth/ForgotPass.vue')
  },
  {
    name: 'home',
    path: '/home',
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

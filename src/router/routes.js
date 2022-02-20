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
    component: () => import('pages/auth/ForgotPass.vue'),
    meta: { hideForAuth: true }
  },
  {
    path: '/app',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requireLogin: true,
      role: 'MainUser'
    },
    children: [
      {
        path: '',
        name: 'reportsHome',
        component: () => import('pages/mu/reports/ReportsHome')
      },
      {
        path: 'wizard',
        name: 'wizardHome',
        component: () => import('pages/mu/wizard/WizardHome')
      },
      {
        path: 'my-files',
        name: 'filesHome',
        component: () => import('pages/mu/files/FilesHome')
      },
      {
        path: 'my-settings',
        name: 'settingsHome',
        component: () => import('pages/mu/settings/SettingsHome')
      },
      {
        path: 'jobs',
        name: 'jobsHome',
        component: () => import('pages/mu/jobs/Jobs')
      }
    ]
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requireLogin: true,
      role: 'OTTITOAdmin'
    },
    children: [
      {
        path: '',
        name: 'usersHome',
        component: () => import('pages/oa/users/UsersHome')
      },
      {
        path: 'notifications',
        name: 'notificationsHome',
        component: () => import('pages/oa/notifications/NotificationsHome')
      }, {
        path: 'user/:id',
        name: 'userInfo',
        component: () => import('pages/oa/user/UserInfo'),
        props: true
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

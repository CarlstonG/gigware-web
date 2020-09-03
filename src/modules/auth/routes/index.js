import Registration from '@/modules/auth/views/Registration'
import Login from '@/modules/auth/views/Login'
import LoginAs from '@/modules/auth/views/LoginAs'
import Forgot from '@/modules/auth/views/Forgot'
import PasswordReset from '@/modules/auth/views/PasswordReset'
import TrackerRegistration from '@/modules/auth/views/TrackerRegistration'
import TrackerLogin from '@/modules/auth/views/TrackerLogin'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
    }
  },
  {
    path: '/registration',
    name: 'register',
    component: Registration,
    meta: {
      auth: false
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
    meta: {
      // auth: false // allow users restore password under signed in account
    }
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: PasswordReset,
    meta: {
      // auth: false // allow users reset password under signed in account
    }
  },
  {
    path: '/login-as',
    name: 'login-as',
    component: LoginAs,
    meta: {
      auth: {
        roles: 'admin',
        redirect: { name: '404' },
      }
    }
  },
  {
    path: '/tracker-registration',
    name: 'tracker-registration',
    component: TrackerRegistration,
    // beforeEnter: (to, from, next) => {
    //   // check for tracker
    //   // console.log(localStorage.getItem('tracker') + 'asdasda')
    //   if (localStorage.getItem('tracker') != null) {
    //     window.location.href = '/tracker/dashboard'
    //   } else {
    //     next()
    //   }

    // },
    meta: {
      auth: false
    }
  },
  {
    path: '/tracker-login',
    name: 'tracker-login',
    component: TrackerLogin,
    // beforeEnter: (to, from, next) => {
    //   // check for tracker
    //   if (localStorage.getItem('tracker') != null) {
    //     window.location.href = '/tracker/dashboard'
    //   } else {
    //     next()
    //   }

    // },
    meta: {
      auth: false
    }
  },
]

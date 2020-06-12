import Registration from '@/modules/auth/views/Registration'
import Login from '@/modules/auth/views/Login'
import LoginAs from '@/modules/auth/views/LoginAs'
import Forgot from '@/modules/auth/views/Forgot'
import PasswordReset from '@/modules/auth/views/PasswordReset'

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
]

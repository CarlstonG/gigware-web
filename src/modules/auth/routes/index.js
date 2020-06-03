import Registration from '@/modules/auth/views/Registration'
import Login from '@/modules/auth/views/Login'
import Forgot from '@/modules/auth/views/Forgot'
import PasswordReset from '@/modules/auth/views/PasswordReset'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'register',
    component: Registration,
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: PasswordReset,
  },
]

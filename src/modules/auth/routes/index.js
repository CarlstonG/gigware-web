import Registration from '@/modules/auth/views/Registration'
import Login from '@/modules/auth/views/Login'

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
]

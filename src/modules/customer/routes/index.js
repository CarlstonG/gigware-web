import Settings from '@/modules/customer/views/settings/Settings'
import SettingsLayout from '@/modules/customer/views/settings/Layout'
import { getAuth } from "../../../plugins/auth/vue-auth-extension";

export default [
  {
    path: '/settings',
    component: SettingsLayout,
    redirect: () => {
      const $auth = getAuth();
      const user = $auth.user();
      return $auth.check('customer') ?
        { name: 'customer.settings' } :
        $auth.check('provider') ?
          user?.provider_profile?.is_registered ? { name: 'provider.settings.basic-information' } :
            { name: 'provider.onboarding.basic-information' } :
          { name: 'home' }
    },
    children: [
      {
        path: '/settings/customer',
        name: 'customer.settings',
        component: Settings,
        meta: {
          title: 'Customer Settings',
          auth: {
            roles: ['customer', 'admin']
          }
        }
      }
    ]
  }
]

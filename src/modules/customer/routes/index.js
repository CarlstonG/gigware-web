import Settings from '@/modules/customer/views/settings/Settings'
import SettingsLayout from '@/modules/customer/views/settings/Layout'

export default [
  {
    path: '/settings',
    component: SettingsLayout,
    children: [
      {
        path: '/settings/customer',
        name: 'customer.settings',
        component: Settings,
        meta: {
          title: 'Customer Settings'
        }
      }
    ]
  }
]

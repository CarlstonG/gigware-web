import Settings from '@/modules/customer/views/settings/Settings'
import SettingsLayout from '@/modules/customer/views/settings/Layout'

import Jobs from '@/modules/customer/views/jobs/Jobs'
import JobsLayout from '@/modules/customer/views/jobs/Layout'
import JobAdd from '@/modules/customer/views/jobs/Add'
import List from '@/modules/customer/views/jobs/List'

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
  },
  {
    path: '/jobs',
    component: JobsLayout,
    redirect: () => {
      const $auth = getAuth();
      const user = $auth.user();
      return $auth.check('customer') ?
        { name: 'customer.jobs' } :
        $auth.check('provider') ?
          user?.provider_profile?.is_registered ? { name: 'provider.settings.basic-information' } :
            { name: 'provider.onboarding.basic-information' } :
          { name: 'home' }
    },
    children: [
      {
        path: '/jobs/customer',
        name: 'customer.jobs',
        component: Jobs,
        meta: {
          displayHeader: false,
          showAddButton: false,
          title: 'Customer Jobs',
          auth: {
            roles: ['customer', 'admin']
          }
        }
      },
      {
        path: '/jobs/customer/add',
        name: 'customer.jobs.add',
        component: JobAdd,
        meta: {
          displayHeader: true,
          showAddButton: false,
          title: 'Add New Job',
          subtitle: 'Describe your job needs and click Publish in to post it.',
          auth: {
            roles: ['customer', 'admin']
          }
        }
      },
      {
        path: '/jobs/customer/list',
        name: 'customer.jobs.list',
        component: List,
        meta: {
          displayHeader: true,
          showAddButton: true,
          title: 'Posted Jobs',
          auth: {
            roles: ['customer', 'admin']
          }
        }
      }
    ]
  }
]

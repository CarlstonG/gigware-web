import SearchProfilesList from "@/modules/admin/views/SearchProfilesList";
import VerifyProvider from "@/modules/admin/views/VerifyProvider";
import RegistrationApproval from "@/modules/admin/views/RegistrationApproval";

export default [
  {
    path: '/admin/search-profiles',
    name: 'admin.search-profiles',
    component: SearchProfilesList,
    meta: {
      auth: {
        roles: 'admin',
        redirect: { name: '404' } // redirect on 401 in any request
      }
    }
  },
  {
    path: '/admin/verification-providers/:id',
    name: 'admin.verify-provider',
    component: VerifyProvider,
    meta: {
      auth: {
        roles: 'admin',
        redirect: { name: '404' }
      }
    }
  },
  {
    path: '/admin/registration-approval',
    name: 'admin.registration-approval',
    component: RegistrationApproval,
    meta: {
      auth: {
        roles: 'admin',
        redirect: { name: '404' }
      }
    }
  }
]

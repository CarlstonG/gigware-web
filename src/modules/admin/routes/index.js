import SearchProfilesList from "@/modules/admin/views/SearchProfilesList";
import VerifyProvider from "@/modules/admin/views/VerifyProvider";

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
  }
]

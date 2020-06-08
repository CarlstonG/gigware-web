import SearchProfilesList from "@/modules/admin/views/SearchProfilesList";
import VerifyProvider from "@/modules/admin/views/VerifyProvider";

export default [
  {
    path: '/admin/search-profiles',
    name: 'admin.search-profiles',
    component: SearchProfilesList,
  },
  {
    path: '/admin/verification-providers/:id',
    name: 'admin.verify-provider',
    component: VerifyProvider,
  }
]

import { newSearchStore } from '@/modules/search/store'
import api from "@/modules/admin/services/admin.api";

export default newSearchStore(api);

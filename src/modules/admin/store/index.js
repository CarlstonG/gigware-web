import searchVerifiableProfiles from "./modules/search-verifiable-profiles"
import verifyProviderProfile from "./modules/verify-provider-profile"
import BaseListStore from "@/core/store/base/base-list"
import api from "../services/admin.api"

export default {
  namespaced: true,
  modules: {
    searchVerifiableProfiles,
    verifyProviderProfile,
    pendingVerificationQueue: new BaseListStore(api.pendingVerificationQueueRequest),
  }
}

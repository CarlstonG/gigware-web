import newState from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import searchApi from "@/modules/search/services/search.api";

export function newSearchStore(api) {
  return {
    namespaced: true,
    state: newState(),
    mutations,
    actions: actions.newActionsWithApi(api),
    getters,
  }
}

export default newSearchStore(searchApi);

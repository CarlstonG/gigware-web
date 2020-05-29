import api from "@/modules/search/services/search.api";

export default {
  clearSearchQueryFilters(context) {
    context.commit('CLEAR_SEARCH_QUERY_FILTERS');
  },
  fetchPartnersSearchRequest(context) {
    return new Promise((resolve, reject) => {
      if (context.getters.isLoading) {
        reject({ message: 'search is loading' });
        return;
      }
      context.commit('SET_PARTNERS_SEARCH_SEARCH_STATE', true);

      const searchQuery = context.getters.searchQuery;
      api.searchApiRequest(searchQuery)
        .then(({data: { data }}) => {
          context.commit('SET_PARTNERS_SEARCH_RESULT', data)
          context.commit('SET_PARTNERS_SEARCH_SEARCH_QUERY_SUCCEED', searchQuery)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          context.commit('SET_PARTNERS_SEARCH_SEARCH_STATE', false);
        })
    })
  }
}

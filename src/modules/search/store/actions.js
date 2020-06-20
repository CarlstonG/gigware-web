export default {
  // use this to construct any search instance
  newActionsWithApi: (api) => {
    return {
      updateSearchQueryFilters(context, newValue) {
        context.commit('UPDATE_SEARCH_QUERY_FILTERS', newValue);
      },
      clearSearchQueryFilters(context) {
        context.commit('CLEAR_SEARCH_QUERY_FILTERS');
      },
      fetchPartnersSearchNextPageRequest({ state, dispatch }) {
        const nextPage = (state.search_pagination?.current_page || 1) + 1;
        if (nextPage > state.search_pagination.total_pages) return;

        return dispatch('fetchPartnersSearchRequest', nextPage);
      },
      fetchPartnersSearchPrevPageRequest({ state, dispatch }) {
        const prevPage = (state.search_pagination?.current_page || 1) - 1;
        if (prevPage < 1) return;

        return dispatch('fetchPartnersSearchRequest', prevPage);
      },
      fetchPartnersSearchRequest({ commit, getters }, page = 1) {
        return new Promise((resolve, reject) => {
          if (getters.isLoading) {
            reject({ message: 'search is loading' });
            return;
          }
          commit('SET_PARTNERS_SEARCH_SEARCH_STATE', true);
          commit('SET_SEARCH_QUERY_PAGE', page);

          const searchQuery = getters.searchQuery;
          api.searchApiRequest(searchQuery)
            .then(({ data }) => {
              commit('SET_PARTNERS_SEARCH_RESULT', data)
              commit('SET_PARTNERS_SEARCH_SEARCH_QUERY_SUCCEED', searchQuery)
              resolve(data)
            })
            .catch(error => {
              reject(error)
            })
            .finally(() => {
              commit('SET_PARTNERS_SEARCH_SEARCH_STATE', false);
            })
        })
      }
    }
  }
}

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
      fetchPartnersSearchRequest(context, page = 1) {
        return new Promise((resolve, reject) => {
          if (context.getters.isLoading) {
            reject({ message: 'search is loading' });
            return;
          }
          context.commit('SET_PARTNERS_SEARCH_SEARCH_STATE', true);

          const searchQuery = context.getters.searchQuery;
          searchQuery.page = page;
          api.searchApiRequest(searchQuery)
            .then(({ data }) => {
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
  }
}

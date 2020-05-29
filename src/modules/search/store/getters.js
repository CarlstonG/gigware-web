export default {
  searchQuery: (state) => state.search_query,
  lastSearchQuery: (state) => state.search_query_succeed,
  isLoading: (state) => state.search_state === 'loading',
  queryFiltersCount: (state) => Object.values(state.search_query.filter).filter(item => !!item).length
}

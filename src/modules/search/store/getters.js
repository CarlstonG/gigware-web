export default {
  searchQuery: (state) => state.search_query,
  searchQueryFilter: (state) => state.search_query.filter,
  lastSearchQuery: (state) => state.search_query_succeed,
  isLoading: (state) => state.search_state === 'loading',
  queryFiltersCount: (state) => Object.values(state.search_query.filter).filter(item => !!item).length,
  queryFiltersChange: (state) => Object.values(state.search_query.filter) ? state.search_query.filter : [],
}

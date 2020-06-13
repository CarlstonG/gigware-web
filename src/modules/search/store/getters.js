export default {
  result: (state) => state.search_result,
  searchQuery: (state) => state.search_query,
  searchQueryFilter: (state) => state.search_query.filter,
  lastSearchQuery: (state) => state.search_query_succeed,
  lastSearchQueryText: (state) => state.search_query_succeed.search.text,
  isLoading: (state) => state.search_state === 'loading',
  searchPagination: (state) => state.search_pagination,
  queryFiltersCount: (state) => Object.values(state.search_query.filter).filter(item => !!item).length,
  queryFiltersChange: (state) => Object.values(state.search_query.filter) ? state.search_query.filter : [],
}

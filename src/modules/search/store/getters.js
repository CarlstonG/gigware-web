export default {
  query: (state) => state.search_query,
  queryFiltersCount: (state) => Object.values(state.search_query.filter).filter(item => !!item).length
}

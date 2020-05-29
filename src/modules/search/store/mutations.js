export default {
  SET_PARTNERS_SEARCH_RESULT(state, data) {
    if (state.search_result) {
      state.search_result = Object.assign({}, data)
    } else {
      state.search_result = data
    }
  },

  CLEAR_SEARCH_QUERY_FILTERS(state) {
    Object.keys(state.search_query.filter).forEach((k) => state.search_query.filter[k] = '');
  }
}

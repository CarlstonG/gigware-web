export default {
  SET_PARTNERS_SEARCH_RESULT(state, data) {
    if (state.search_result) {
      state.search_result = Object.assign({}, data)
    } else {
      state.search_result = data
    }
  },

  UPDATE_SEARCH_QUERY_FILTERS(state, newValue) {
    state.search_query = Object.assign({}, newValue);
  },

  CLEAR_SEARCH_QUERY_FILTERS(state) {
    Object.keys(state.search_query.filter).forEach((k) => state.search_query.filter[k] = '');
  },

  SET_PARTNERS_SEARCH_SEARCH_QUERY_SUCCEED(state, newValue) {
    state.search_query = newValue;
  },

  SET_PARTNERS_SEARCH_SEARCH_STATE(state, isLoading) {
    state.search_state = isLoading ? 'loading' : null;
  }
}

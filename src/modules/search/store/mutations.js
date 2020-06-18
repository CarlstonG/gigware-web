export default {
  SET_PARTNERS_SEARCH_RESULT(state, data) {
    state.search_result = data?.data
    state.search_pagination = data?.meta?.pagination
  },

  RESET_SEARCH_RESULT(state) {
    state.search_result = null;
    state.search_pagination = null;
    state.search_state = null;
  },

  UPDATE_SEARCH_QUERY_FILTERS(state, newValue) {
    state.search_query = Object.assign({}, newValue);
  },

  SET_SEARCH_QUERY_PAGE(state, page) {
    state.search_query.page = page;
  },

  CLEAR_SEARCH_QUERY_FILTERS(state) {
    Object.keys(state.search_query.filter).forEach((k) => state.search_query.filter[k] = '');
  },

  SET_PARTNERS_SEARCH_SEARCH_QUERY_SUCCEED(state, newValue) {
    state.search_query_succeed = JSON.parse(JSON.stringify(newValue)); // without old observers
  },

  SET_PARTNERS_SEARCH_SEARCH_STATE(state, isLoading) {
    state.search_state = isLoading ? 'loading' : null;
  }
}

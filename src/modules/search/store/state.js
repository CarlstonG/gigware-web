const searchQueryTemplate = {
  filter: {
    team_size: '',
    rates: '',
    availability: '',
  },
  search: {
    field: '',
    text: '',
  }
};

export default {
  search_result: null,
  search_query: searchQueryTemplate,
  search_query_succeed: searchQueryTemplate,
  search_state: null,
  search_meta: null,
}

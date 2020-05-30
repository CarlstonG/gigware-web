const searchQueryTemplate = {
  filter: {
    team_size: '',
    rates: '',
    availability: '',
  },
  search: {
    field: '',
    text: '',
  },
  page: 0
};

export default {
  search_result: null,
  search_query: searchQueryTemplate,
  search_query_succeed: JSON.parse(JSON.stringify(searchQueryTemplate)), // need different objects
  search_state: null,
  search_pagination: null,
}

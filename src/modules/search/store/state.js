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

const state = () => ({
  search_result: null,
  search_query: searchQueryTemplate,
  search_query_succeed: JSON.parse(JSON.stringify(searchQueryTemplate)), // need different objects
  search_state: null,
  search_pagination: null,
})

// this make a new instance of state on every import
export default state

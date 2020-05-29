import api from "@/modules/search/services/search.api";

export default {
  clearSearchQueryFilters(context) {
    context.commit('CLEAR_SEARCH_QUERY_FILTERS');
  },
  fetchPartnersSearchRequest(context) {
    return new Promise((resolve, reject) => {
      api.searchApiRequest(context.state.search_query)
        .then((res) => {
          if (res.statusCode === 200) {
            const data = res.data;
            context.commit('SET_PARTNERS_SEARCH_RESULT', data)
            resolve(data)
          } else {
            throw res;
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

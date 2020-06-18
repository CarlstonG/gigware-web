export default class {
  #apiRequest = null;

  constructor(apiRequest, namespaced = true) {
    this.#apiRequest = apiRequest;

    this.namespaced = namespaced;

    this.state = {
      data: null,
      loading: false,
    };
    this.getters = {
      data: state => state.data,
      isLoading: state => state.loading
    };
    this.actions = {
      fetch: ({ state, commit }) => {
        if (state.loading) return Promise.resolve();
        commit('SET_LOADING', true);

        return this.#apiRequest()
          .then(resp => {
            if (!resp) throw new Error('empty data response');

            commit('SET_DATA', resp.data);


            return resp.data;
          })
          .finally(() => {
            commit('SET_LOADING', false);
          })
      },
    };
    this.mutations = {
      SET_DATA(state, data) {
        state.data = data;
      },

      SET_LOADING(state, isLoading) {
        state.loading = isLoading;
      }
    };
  }
}

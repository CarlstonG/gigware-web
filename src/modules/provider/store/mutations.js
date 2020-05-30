export default {
  SET_PROVIDER_PROFILE(state, data) {
    if (state.provider_profile) {
      state.provider_profile = Object.assign({}, data)
    } else {
      state.provider_profile = data
    }
  },

  SET_PROVIDER_PROFILE_STATE(state, isLoading) {
    state.provider_profile_state = isLoading ? 'loading' : null;
  }
}

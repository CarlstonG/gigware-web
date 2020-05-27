export default {
  SET_BASIC_INFORMATION(state, data) {
    if (state.provider_profile) {
      state.provider_profile = Object.assign({}, data)
    } else {
      state.provider_profile = data
    }
  },
}

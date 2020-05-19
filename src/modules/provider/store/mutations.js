export default {
  SET_BASIC_INFORMATION(state) {
      console.log(state.auth.user)
      console.log(state.user)
    // if (state.provider_profile) {
    //   state.provider_profile = Object.assign({}, data.provider_profile)
    //   state.images = Object.assign({}, data.images)
    // } else {
    //   state.provider_profile = data
    // }
  },
}

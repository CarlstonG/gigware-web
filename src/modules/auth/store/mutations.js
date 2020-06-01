export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_USER_PROVIDER_PROFILE(state, profile) {
    state.user.provider_profile = JSON.parse(JSON.stringify(profile))
  },
  SET_USER_CUSTOMER_PROFILE(state, profile) {
    state.user.profile = JSON.parse(JSON.stringify(profile))
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
}

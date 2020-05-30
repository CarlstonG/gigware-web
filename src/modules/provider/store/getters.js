export default {
  profile: (state) => state.provider_profile,
  isLoading: (state) => state.provider_profile_state === 'loading'
}

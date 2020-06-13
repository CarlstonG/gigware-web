export default {
  user: state => state.user,
  // todo: allow user upload only one image
  avatarUrl: state => state.user?.images?.data?.length ? state.user.images.data[state.user.images.data.length - 1].url : null,
  isAdmin: (state) => state.user?.system_role === 'admin',
  isProvider: (state, getters) => getters.user?.role?.slug === 'provider',
  isCustomer: (state, getters) => getters.user?.role?.slug === 'customer-end-user' || getters.user?.role?.slug === 'customer-integrator',
  providerProfile: (state) => state.user?.provider_profile,
  customerProfile: (state) => state.user?.profile,
  providerProfileId: (state) => state.user?.provider_profile?.id
}

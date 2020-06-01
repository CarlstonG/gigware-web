export default {
    user: state => state.user,
    // todo: allow user upload only one image
    userAvatarUrl: state => state.user?.images?.data?.length ? state.user.images.data[state.user.images.data.length - 1].url : null,
    token: state => state.token,
    isLoggedIn: (state, getters) => getters.token,
    isProvider: (state, getters) => getters.isLoggedIn && getters.user.role.slug == 'provider',
    userProviderProfileId: (state) => state.user?.provider_profile?.id
}

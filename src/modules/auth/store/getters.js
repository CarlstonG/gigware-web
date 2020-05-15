export default {
    user: state => state.user,
    token: state => state.token,
    isLoggedIn: (state, getters) => getters.token,
    isProvider: (state, getters) => getters.isLoggedIn && getters.user.role.slug == 'provider' 
}

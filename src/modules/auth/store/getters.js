export default {
    user: state => state.user,
    isLoggedIn: state => state.token,
    isProvider: (state, getters) => getters.isLoggedIn && getters.user.role.slug == 'provider' 
}

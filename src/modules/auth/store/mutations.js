import Vue from "../../../main";

export default {
  SET_USER(state, user) {
    Vue.$auth.user(user); // sync user with $auth
    state.user = user
  },
  SET_USER_IMAGES(state, images) {
    state.user.images = JSON.parse(JSON.stringify(images))
  },
  SET_USER_PROVIDER_PROFILE(state, newData) {
    let oldData = JSON.parse(JSON.stringify(state.user.provider_profile || {}));
    state.user.provider_profile = Object.assign(oldData, newData);
  },
  SET_USER_CUSTOMER_PROFILE(state, newData) {
    let oldData = JSON.parse(JSON.stringify(state.user.profile || {}));
    state.user.profile = Object.assign(oldData, newData);
  },
}

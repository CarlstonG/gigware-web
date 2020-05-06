import { post, put } from '@/http/request/loaderRequest'
import {
  post as simplePost,
  destroy as simpleDestroy,
} from '@/http/request/simpleRequest'
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  PERSONAL_INFO,
  AVATAR,
} from '@/common/uri'
import { addUriParam } from '@/http/request/helpers'
import { USER_TYPE_SELLER } from './constants'

const module = {}

module.namespaced = true

module.state = {
  user: {},
}

module.mutations = {
  INCREMENT_FAVORITE_PRODUCTS_COUNT(state) {
    state.user.favorite_products_count++
  },

  DECREMENT_FAVORITE_PRODUCTS_COUNT(state) {
    state.user.favorite_products_count--
  },

  UPDATE_AVATAR(state, avatar) {
    state.user.avatar = Object.assign({}, avatar)
  },
}

module.actions = {
  validateEmail(context, payload) {
    return simplePost(REGISTER, payload)
  },

  login(context, payload) {
    return post(LOGIN, payload)
  },

  register(context, payload) {
    return post(REGISTER, payload)
  },

  logout() {
    return simplePost(LOGOUT)
  },

  forgotPassword(context, payload) {
    return post(FORGOT_PASSWORD, payload)
  },

  resetPassword(context, payload) {
    return post(RESET_PASSWORD, payload)
  },

  uploadAvatar({ commit }, avatar) {
    return new Promise((resolve, reject) => {
      simplePost(AVATAR, avatar)
        .then(({ data }) => {
          commit('UPDATE_AVATAR', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  removeAvatar(context, avatarId) {
    return simpleDestroy(addUriParam(AVATAR, avatarId))
  },

  updatePersonalInfo(context, user) {
    return new Promise(resolve => {
      put(PERSONAL_INFO, user).then(() => {
        resolve()
      })
    })
  },

  changePassword(context, payload) {
    return put(CHANGE_PASSWORD, payload)
  },

  incrementFavoriteProductsCount({ commit }) {
    commit('INCREMENT_FAVORITE_PRODUCTS_COUNT')
  },

  decrementFavoriteProductsCount({ commit }) {
    commit('DECREMENT_FAVORITE_PRODUCTS_COUNT')
  },
}

module.getters = {
  isLoggedIn: state => !!state.user.id,

  user: ({ user }) => user,

  isSeller: ({ user }) => user.type == USER_TYPE_SELLER,
}

export default module

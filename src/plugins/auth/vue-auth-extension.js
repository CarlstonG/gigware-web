import VueAuth from '@websanova/vue-auth';
import processTransitionEach from "./drivers/vue-router-process-transition-each";
import { compareRoles } from "./vue-auth/roles";

const __defaultOptions = {
  rolesKey: '_roles',
  // External
  storeUserFn: (user) => {
    return user; // stub
  },
  getStoreUserFn: () => {
    return null;
  },
  // router
  processTransitionEach
};

let __auth = null;

export default function (Vue, options) {
  // init vue-auth
  VueAuth(Vue, Object.assign(__defaultOptions, options));

  __auth = Vue.auth;
  __auth.authRedirect = __auth.options.authRedirect; // fix parent mistake
  __auth.options.refreshData.enabled = false; // disable this because it's overridden with an axios interceptor

  /*
   * initial extended state
   */
  const _data = JSON.parse(JSON.stringify(__auth.$vm.$data));
  __auth.$vm = new __auth.Vue({
    data: function () {
      return Object.assign(_data, {
        signing_in: false,
        fetched: false,
      });
    }
  });

  // preset stored user
  if (__auth.token()) {
    __auth.user(__auth.options.getStoreUserFn())
  }

  /*
   * local functions
   */

  // assign roles to the right place
  function _processRoles() {
    if (__auth.$vm.data) {
      const roles = [];

      roles.push(__auth.$vm.data.system_role);
      roles.push(__auth.$vm.data.role?.slug);

      switch (__auth.$vm.data.role?.slug) {
        case 'customer-integrator':
        case 'customer-end-user':
          roles.push('customer'); // general role
          break;
      }

      __auth.$vm.data[__auth.options.rolesKey] = roles;
    }
  }

  /*
   * override functions
   */
  const _login = __auth.login;
  __auth.login = (data) => {
    __auth.$vm.signing_in = true;

    return _login(data).finally(() => {
      __auth.$vm.signing_in = false;
    });
  }

  const _logout = __auth.logout;
  __auth.logout = (data) => {
    return _logout(data).then(() => {
      __auth.options.storeUserFn(null);

      return Promise.resolve(data);
    });
  }

  const _fetch = __auth.fetch;
  __auth.fetch = (data) => {
    __auth.$vm.signing_in = true;

    return _fetch(data)
      .then((res) => {
        _processRoles();
        __auth.options.storeUserFn(
          __auth.$vm.data
        );

        return Promise.resolve(res);
      })
      .finally(() => {
        __auth.$vm.signing_in = false;
        __auth.$vm.fetched = true;
      });
  }

  const _user = __auth.user;
  __auth.user = (data) => {
    if (data !== undefined) {
      __auth.$vm.fetched = true;
    }

    const res = _user(data);
    _processRoles();

    return res;
  }

  // multiple roles support
  __auth.check = (role, key) => {
    if (__auth.$vm.authenticated === true) {
      if (role) {
        return compareRoles(role, (__auth.$vm.data || {})[key || __auth.options.rolesKey]);
      }

      return true;
    }

    return false;
  }

  /*
   * new functions
   */
  __auth.userFetched = () => {
    return new Promise(function (resolve) {
      if (__auth.$vm.fetched) {
        resolve();
        return;
      }

      let timer = null;
      timer = setInterval(function () {
        if (__auth.$vm.fetched) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }
}

export function getAuth() {
  return __auth;
}

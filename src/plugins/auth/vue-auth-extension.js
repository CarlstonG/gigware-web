import VueAuth from '@websanova/vue-auth';

const __defaultOptions = {
  // External
  storeUserFn: () => {
  }
};

export default function (Vue, options) {
  VueAuth(Vue, Object.assign(__defaultOptions, options));

  const __auth = Vue.auth;

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

    return _user(data);
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

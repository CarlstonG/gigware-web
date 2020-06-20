export default {
  init: function () {
    if (!this.Vue.router) {
      return 'vue-router.2.x.js : Vue.router must be set.';
    }
  },

  beforeEach: function (routerBeforeEach, transitionEach, setTransitions, getAuthMeta) {
    const _this = this;

    this.Vue.router.beforeEach(function (transition, location, next) {
      setTransitions(transition);
      routerBeforeEach.call(_this, function () {
        const auth = getAuthMeta(transition);

        const processTransitionEach = _this.Vue.auth.options.processTransitionEach || transitionEach;
        processTransitionEach.call(_this, transition, auth, function (redirect) {
          if (!redirect) {
            (next || transition.next)();
            return;
          } // router v2.x

          if (next) {
            next(redirect);
          } else {
            this.router._routerReplace.call(this, redirect);
          }
        });
      });
    });
  },
  routerReplace: function (data) {
    const router = this.Vue.router;
    router.replace.call(router, data);
  },
  routerGo: function (data) {
    const router = this.Vue.router;
    const route = this.Vue.auth?.transitionThis;
    const redirect = data?.redirect || data;

    if (redirect && route.path !== redirect) {
      (router.push || router.go).call(router, redirect).catch(function (err) {
        console.error('vue-auth routerGo: ', err);
      });
    }
  }
};

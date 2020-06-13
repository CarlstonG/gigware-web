import { isObject, toArray } from "../vue-auth/utils";
import { compareRoles } from "../vue-auth/roles";

/*
 * multi roles support
 */
export default function processTransitionEach(transition, routeAuth, cb) {
  const __auth = this.Vue.auth;

  let authRedirect = (routeAuth || '').redirect || __auth.options.authRedirect,
    forbiddenRedirect = (routeAuth || '').forbiddenRedirect || (routeAuth || '').redirect || __auth.options.forbiddenRedirect,
    notFoundRedirect = (routeAuth || '').notFoundRedirect || (routeAuth || '').redirect || __auth.options.notFoundRedirect;

  routeAuth = toArray((routeAuth || '').roles !== undefined ? routeAuth.roles : routeAuth);

  if (routeAuth && (routeAuth === true || routeAuth.constructor === Array || isObject(routeAuth))) {
    if (!__auth.check()) {
      __auth.transitionRedirectType = 401;

      if (typeof authRedirect === 'function') {
        authRedirect = authRedirect(transition);
      }

      cb.call(__auth, authRedirect);
    } else if ((routeAuth.constructor === Array || isObject(routeAuth)) && !compareRoles(routeAuth, __auth.$vm.data[__auth.options.rolesKey])) {
      __auth.transitionRedirectType = 403;

      if (typeof forbiddenRedirect === 'function') {
        forbiddenRedirect = forbiddenRedirect(transition);
      }

      cb.call(__auth, forbiddenRedirect);
    } else {
      __auth.$vm.redirect = __auth.transitionRedirectType ? {
        type: __auth.transitionRedirectType,
        from: __auth.transitionPrev,
        to: __auth.transitionThis
      } : null;
      __auth.transitionRedirectType = null;
      return cb();
    }
  } else if (routeAuth === false && __auth.check()) {
    __auth.transitionRedirectType = 404;

    if (typeof notFoundRedirect === 'function') {
      notFoundRedirect = notFoundRedirect(transition);
    }

    cb.call(__auth, notFoundRedirect);
  } else {
    __auth.$vm.redirect = __auth.transitionRedirectType ? {
      type: __auth.transitionRedirectType,
      from: __auth.transitionPrev,
      to: __auth.transitionThis
    } : null;
    __auth.transitionRedirectType = null;
    return cb();
  }
}

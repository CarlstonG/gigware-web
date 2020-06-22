export default {
  init: function () {
    if (!this.Vue.axios) {
      return 'axios.js : Vue.axios must be set.';
    }
  },
  interceptor: function (req, res) {
    const _this = this;

    if (req) {
      this.Vue.axios.interceptors.request.use(
        request => {
          req.call(_this, request);
          return request;
        },
        error => {
          req.call(_this, error.request);
          throw error
        });
    }

    if (res) {
      this.Vue.axios.interceptors.response.use(response => {
          res.call(_this, response);
          return response;
        },
        async error => {
          if (!error || !error.response) throw error;

          if (!_this.token() || error.response.status !== 401) {
            res.call(_this, error.response);
            throw error;
          }

          /* refresh token and retry request once more on 401
           * else log user out
           */
          const { config: originalReq } = error

          // skip refresh token request, retry attempts to avoid infinite loops
          if (originalReq.url !== _this.options.refreshData.url && !originalReq.isRetryAttempt) {
            try {
              // vue-auth interceptor will get token automatically
              await _this.Vue.axios.get(_this.options.refreshData.url);
              return await _this.Vue.axios.request(originalReq);
            } catch (e) {
              // call callback with the original error to force logout
              res.call(_this, error.response);
              // suppress original error to throw the new one to get new information
              throw e;
            }
          } else {
            // res.call(_this, error.response);
            console.warn('several requests rash for token refresh, please check that all are ok')
            throw error
          }
        });
    }
  },
  invalidToken: function (res) {
    return res.status === 401;
  },
  httpData: function (res) {
    return res.data || {};
  },
  http: function (data) {
    const http = this.Vue.axios(data);
    http.then(data.success, data.error);
    return http;
  },
  getHeaders: function (res) {
    return res.headers;
  },
  setHeaders: function (req, headers) {
    req.headers.common = Object.assign({}, req.headers.common, headers);
  }
}

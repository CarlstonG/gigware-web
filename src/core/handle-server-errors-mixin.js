export default {
  name: 'handle-server-errors-mixin',
  computed: {
    statusCode() {
      return this.serverError && this.serverError.response
        ? this.serverError.response.status
        : null
    },
  },
  data() {
    return {
      serverError: {},
      defaultMessage: `An unknown error occured, please contact ${process.env.VUE_APP_SUPPORT_EMAIL_ADDRESS} if the problem persists.`,
    }
  },
  methods: {
    handle403(
      message = 'Insufficent permissions to access this page.',
      goBack = true,
    ) {
      this.toast(message, goBack)
    },
    handle404(message = 'Page not found.', goBack = true) {
      this.toast(message, goBack)
    },
    handle500() {
      this.toast(this.defaultMessage)
    },
    toast(
      message,
      goBack = true,
      title = 'Error',
      variant = 'danger',
      position = 'b-toaster-top-right',
    ) {
      this.$root.$bvToast.toast(message, {
        toaster: position,
        title: title,
        variant: variant,
      })
      if (goBack) {
        this.handleBack()
      }
    },
    handleServerError(serverError, callback) {
      this.serverError = serverError

      if (this.statusCode === 422) {
        callback(serverError.response.data.errors)
      } else if (this.statusCode === 403) {
        this.handle403()
      } else if (this.statusCode === 404) {
        this.handle404()
      } else if (this.statusCode === 500) {
        this.handle500()
      } else {
        this.toast(this.defaultMessage)
      }
    },
  },
}

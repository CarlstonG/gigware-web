const DEFAULT_MESSAGE =
  'An unknown error occurred, please try again and if the error still exists, please contact us'

export default {
  data: () => ({
    formState: 'default',
    serverErrors: {},
    serverError: {},
  }),
  methods: {
    submit() {
      this.validate(() => {
        const request = this.sendRequest();
        if (!(request instanceof Promise)) {
          throw new Error('core/mixins/validate-form-mixin SHOULD get Promise from sendRequest method');
        }

        request
          .catch(error => {
            this.handleServerError(error)
          })
          .finally(() => {
            this.setDefaultState()
          })
      })
    },
    validate(callback) {
      this.$v?.$touch()

      if (this.$v?.$anyError) return

      this.formState = 'loading'
      this.serverErrors = {}

      callback()
    },
    setErrorState() {
      this.formState = 'error'
    },
    setDefaultState() {
      this.formState = 'default'
    },
    handleConnectionError(message) {
      this.toast(message === 'Network Error' ? 'Please check your internet connection.' : message)
    },
    handle403(message = 'Insufficient permissions to access this page.') {
      this.toast(message)
    },
    handle404(message = 'Page not found.') {
      this.toast(message)
    },
    handle500() {
      this.toast(DEFAULT_MESSAGE)
    },
    toast(message) {
      this.$root.$bvToast.toast(message, {
        toaster: 'b-toaster-top-right',
        variant: 'danger',
      })
    },
    handleServerError(serverError) {
      this.serverError = serverError

      if (!serverError.response && serverError.message) {
        this.handleConnectionError(serverError.message)
        return;
      }

      if (this.statusCode === 422) {
        this.serverErrors = serverError.response.data?.errors || {}
        this.toast(serverError.response.data?.message)
        this.setErrorState()
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
  computed: {
    formLocked() {
      return this.formState === 'loading'
    },
    statusCode() {
      return this.serverError && this.serverError.response
        ? this.serverError.response.status
        : null
    },
  },
}

const DEFAULT_MESSAGE =
  'An unknown error occured, please try again and if the error still exists, please contact us'

export default {
  data: () => ({
    formState: 'default',
    serverErrors: {},
    serverError: {},
  }),
  methods: {
    submit() {
      this.validate(() => {
        this.sendRequest()
      })
    },
    validate(callback) {
      this.$v.$touch()

      if (this.$v.$anyError) return

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
    handle403(message = 'Insufficent permissions to access this page.') {
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
  computed: {
    formLocked() {
      return this.formState == 'loading'
    },
    statusCode() {
      return this.serverError && this.serverError.response
        ? this.serverError.response.status
        : null
    },
  },
}

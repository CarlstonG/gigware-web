export default {
  data: () => ({
    formState: 'default',
    serverErrors: {},
  }),
  methods: {
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
  },
  computed: {
    formLock() {
      return this.formState == 'loading'
    },
  },
}

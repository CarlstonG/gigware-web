import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  providerRegistration: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
}

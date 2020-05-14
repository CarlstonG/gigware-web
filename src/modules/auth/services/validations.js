import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  login: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
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
  customerRegistration: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
      first_name: { required },
      last_name: { required },
      company_name: { required },
      zip_code: { required },
      phone_number: { required },
    },
  },
}

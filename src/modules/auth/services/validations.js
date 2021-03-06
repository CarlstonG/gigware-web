import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  login: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  trackerLogin: {
    form: {
      company_name: { required },
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
  trackerRegistration: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
      company_name: { required },
    },
  },
  forgot: {
    form: {
      email: { required, email },
    },
  },
  newPassword: {
    form: {
      new_password: { required, minLength: minLength(6) },
      new_password_repeat: { required, minLength: minLength(6), sameAsPassword: sameAs('new_password') },
    },
  },
}

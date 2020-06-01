import { required } from 'vuelidate/lib/validators'

export default {
  settings: {
    form: {
      first_name: { required },
      last_name: { required },
      company_name: { required },
      zip_code: { required },
      phone_number: { required },
    },
  },
}

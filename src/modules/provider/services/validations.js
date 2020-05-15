import { required, integer } from 'vuelidate/lib/validators'

export default {
  basicInformation: {
    form: {
      first_name: { required },
      last_name: { required },
      company_name: { required },
      phone_number: { required },
      team_size: { integer }
    },
  },
}

import { required, integer } from 'vuelidate/lib/validators'

export default {
  onboarding: {
    basicInformation: {
      form: {
        first_name: { required },
        last_name: { required },
        company_name: { required },
        phone_number: { required },
        team_size: { integer },
        description: { required },
      },
    },
    ratesAndLocation: {
      form: {
        rates_per_run: { required },
        work_radius: { required },
        address: {
          street_address: { required },
          city: { required },
          suite: { required },
          zip_code: { required },
        }
      },
    },
  },
}

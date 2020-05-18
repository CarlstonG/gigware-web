import { required, email, integer } from 'vuelidate/lib/validators'

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
        },
      },
    },
    experience: {
      forms: {
        $each: {
          job_location: { required },
          job_description: { required },
          employer_name: { required },
          employer_title: { required },
          employer_phone: { required },
          start_date: { required },
          end_date: { required },
        },
      },
    },
    insurance: {
      form: {
        insurance_provider_name: { required },
        start_date: { required },
        end_date: { required },
        image: { required },
      },
    },
    ratingsAndReviews: {
      form: {
        emails: {
          $each: {
            email: { required, email },
          },
        },
        email_template: {
          required,
        },
      },
    },
  },
}
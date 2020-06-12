import Vue from "vue";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import ValidatedBFormGroup from '@/core/components/forms/ValidatedBFormGroup'
import BProgressButton from '@/core/components/forms/BProgressButton'

Vue.use(Vuelidate)
Vue.use(VuelidateErrorExtractor, {
  template: templates.singleErrorExtractor.bootstrap4,
  messages: {
    required: 'The {attribute} field is required',
    email: 'The {attribute} field must be valid',
    minLength: 'The {attribute} field must be {min} characters or more',
    maxLength: 'The {attribute} field must be {max} characters or less',
    minValue: 'The {attribute} field must be equal or greater than {min}',
    maxValue: 'The {attribute} field must be equal or less than {max}',
    integer: 'The {attribute} field must be a non-decimal number',
    sameAsPassword: 'The passwords do not match',
    contactPhoneRegex: 'The {attribute} field must be a valid phone number',
    between: "The {attribute} field is not in range from {min} to {max}",
  },
  attributes: {
    email: 'email address',
    password_confirmation: 'confirm password',
    name: 'name',
    first_name: 'first name',
    last_name: 'last name',
    company_name: 'company',
    phone_number: 'phone number',
    zip_code: 'zip code',
    'address.street_address': 'address',
    'address.city': 'city',
    'address.suite': 'suite',
    'address.zip_code': 'zip code',
  },
})

Vue.component('ValidatedBFormWrapper', templates.FormWrapper)
Vue.component('ValidatedBFormGroup', ValidatedBFormGroup)
Vue.component('BProgressButton', BProgressButton)

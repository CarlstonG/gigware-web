<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <validated-b-form-group name="email" label="Email" :disabled="formLocked">
        <b-form-input v-model.trim.lazy="form.email"
                      :placeholder="placeholders.email"/>
                        <b-button class="mt-2" variant="outline-primary" @click="generateEmail" v-if="this.$route.name=='register-test'">Generate email</b-button>
      </validated-b-form-group>
      <validated-b-form-group
          name="password"
          label="Password"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.password"
                      :placeholder="placeholders.password"
                      type="password"/>
      </validated-b-form-group>
      <validated-b-form-group
          name="password_confirmation"
          label="Confirm password"
          :disabled="formLocked"
      >
        <b-form-input
            v-model.trim.lazy="form.password_confirmation"
            :placeholder="placeholders.password_confirmation"
            type="password"
        />
      </validated-b-form-group>
      <validated-b-form-group
          name="first_name"
          label="First Name"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.first_name"
                      :placeholder="placeholders.first_name"/>
      </validated-b-form-group>
      <validated-b-form-group
          name="last_name"
          label="Last Name"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.last_name"
                      :placeholder="placeholders.last_name"/>
      </validated-b-form-group>
      <validated-b-form-group
          name="company_name"
          label="Company"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.company_name"
                      :placeholder="placeholders.company_name"/>
      </validated-b-form-group>
      <validated-b-form-group
          name="zip_code"
          label="Zip Code"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.zip_code"
                      :placeholder="placeholders.zip_code"/>
      </validated-b-form-group>
      <validated-b-form-group
          name="phone_number"
          label="Phone Number"
          :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.phone_number"
                      :placeholder="placeholders.phone_number"
                      v-on:keyup="formatPhoneNumber()"
                      maxlength="10"/>
      </validated-b-form-group>
      <validated-b-form-group name="role" label="I am a" :disabled="formLocked">
        <b-form-select v-model.trim.lazy="form.role" :options="roles"/>
      </validated-b-form-group>
      <b-form-checkbox v-model="termsAndConds">
        I have read and agree to Gig Wire’s
        <b-link to="/terms">Terms of Service</b-link>
      </b-form-checkbox>
      <b-form-row class="justify-content-end mt-5">
        <b-progress-button
            size="lg"
            :disabled="!termsAndConds || formLocked"
            :state="formState"
            default-text="Submit"
        />
      </b-form-row>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import { mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    mixins: [validateFormMixin],
    data: () => ({
      termsAndConds: false,
      roles: [
        { value: 'customer-integrator', text: 'Integrator' },
        { value: 'customer-end-user', text: 'End User' },
      ],
      form: {
        role: 'customer-integrator',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        company_name: '',
        zip_code: '',
        phone_number: '',
      },
      placeholders: placeholders,
    }),
    validations: validations.customerRegistration,
    methods: {
      ...mapActions('auth', ['registerCustomer']),
      sendRequest() {
        return this.registerCustomer(this.form)
          .then(() => {
            if(this.calendly) {
              window.location.href = "/schedule";
            } else {
              this.$router.push({ name: 'home' })
            }
          })
      },
      formatPhoneNumber() {
        let x = this.form.phone_number;
        return this.form.phone_number = x.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/,'($1)-$2-$3');
      },
      generateEmail() {
        axios.get('https://fakerapi.it/api/v1/users?_quantity=1').then((response)=>{
          this.form.email = response.data.data[0].email;
        })
      }
    },
    computed: {
      calendly: {
        get: function () {
          let res = this.$route.meta.calendly
          if(res == undefined) {
            return true;
          } else {
            return false;
          }
        }
      },
    },
    created() {
      console.log(this.calendly)
    },
  }
</script>

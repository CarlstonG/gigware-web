<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <validated-b-form-group name="email" label="Email" :disabled="formLocked">
        <b-form-input v-model.trim.lazy="form.email" />
        <b-button class="mt-2" variant="outline-primary" @click="generateEmail" v-if="this.$route.name=='register-test'">Generate email</b-button>
      </validated-b-form-group>
      <validated-b-form-group
        name="password"
        label="Password"
        :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.password" type="password" />
      </validated-b-form-group>
      <validated-b-form-group
        name="password_confirmation"
        label="Confirm password"
        :disabled="formLocked"
      >
        <b-form-input v-model.trim.lazy="form.password_confirmation" type="password" />
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
          href="https://calendly.com/gigwire/gigwire-on-boarding-interview"
        >
        <!-- Added calendly link on submit button -->
        <a href="https://calendly.com/gigwire/gigwire-on-boarding-interview"></a>
        
        </b-progress-button>
      </b-form-row>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    mixins: [validateFormMixin],
    data: () => ({
      termsAndConds: false,
      form: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      test: false
    }),
    validations: validations.providerRegistration,
    methods: {
      ...mapActions('auth', ['registerProvider']),
      sendRequest() {
        return this.registerProvider(this.form)
          .then(() => {
            window.location.href = "/schedule";
            // this.$router.push({ name: 'provider.onboarding.basic-information' })
          })
      },
      generateEmail() {
        axios.get('https://fakerapi.it/api/v1/users?_quantity=1').then((response)=>{
          this.form.email = response.data.data[0].email;
        })
      },
    },
  }
</script>

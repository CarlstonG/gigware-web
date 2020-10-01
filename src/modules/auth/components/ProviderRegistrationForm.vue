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

      <!-- Added video link function on registration -->
   
      <!-- End of Added video link function on registration -->
 
  <!--    <video width="200" height="200" controls src="movie.ogg">
</video> -->
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
        <!-- End of calendly link on submit button -->
        </b-progress-button>
      </b-form-row>
    </b-form>
  </validated-b-form-wrapper>

  
</template>


<style type="text/css">
  #overlay{
    margin-top: 5rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
</style>
<script>



  import validations from '../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions } from 'vuex'
  import axios from 'axios'

  export default {
    mixins: [validateFormMixin],
    data: () => ({
        link: '',
        nameState: null,
        submittedLinks: [],
        termsAndConds: false,
        errorMsg: false,
        successMsg: false,
        showAddModal: false,

      form: {
        email: '',
        password: '',
        password_confirmation: '',
        
      },
   
      test: false,
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
          
      
      // video
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    
    },

  
  }

</script>

<template>
  <div>
    <div class="auth">
     <!-- Calendly inline widget begin 
     <div class="calendly-inline-widget" data-url="https://calendly.com/s/zpNiIdpH" style="min-width:320px;height:630px;"></div>-->
      <div class="form-card">
        <p>Schedule an interview</p>
        <p>to get more gigs.</p>
        <b-form-radio-group
          class="mt-5"
          v-model="selectedRole"
          :options="roles"
          stacked
        />
        <provider-registration-form v-if="selectedRole == 1" />
        <customer-registration-form v-else />
       
       
       
        <div class="mt-5">
          Want to
          <b-link :to="{ name: 'login' }">Sign in</b-link>
          instead?
        </div>
      </div>
    </div>
   <!-- <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"> -->
    <site-footer />
     
  </div>
  
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import ProviderRegistrationForm from '../components/ProviderRegistrationForm'
  import CustomerRegistrationForm from '../components/CustomerRegistrationForm'

  export default {
    components: { SiteFooter, ProviderRegistrationForm, CustomerRegistrationForm },
    data: () => ({
      roles: [
        { text: 'I am a Security Partner. I want to get Gigs', value: 1 },
        { text: 'I am a customer. I am looking for Security Partners', value: 2 },
      ],
      selectedRole: 1,
    }),
  }
</script>

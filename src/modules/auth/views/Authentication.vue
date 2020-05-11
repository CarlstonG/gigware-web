<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p>Connect your cable team</p>
        <p>with more business.</p>
        <b-form class="mt-5">
          <b-form-radio-group v-model="form.role" :options="roles" stacked />
          <b-form-group
            v-model="form.email"
            label="Email"
            for="email"
            :state="true"
            class="mt-4"
          >
            <b-form-input id="email" :state="null" trim />
          </b-form-group>
          <b-form-group
            v-model="form.password"
            label="Password"
            for="password"
            :state="true"
            class="mt-4"
          >
            <b-form-input id="password" :state="null" trim />
          </b-form-group>
          <b-form-group
            v-model="form.password_confirmation"
            label="Confirm Password"
            for="password_confirmation"
            :state="true"
            class="mt-4"
          >
            <b-form-input id="password_confirmation" :state="null" trim />
          </b-form-group>
          <b-form-checkbox v-model="termsAndConds">
            I have read and agree to Gig Wire’s
            <b-link>Terms of Service</b-link>
            ?
          </b-form-checkbox>
          <b-form-row class="justify-content-end mt-5">
            <b-button variant="primary" size="lg">Submit</b-button>
          </b-form-row>
          <div class="mt-5">
            Want to
            <b-link>Sign in</b-link>
            instead?
          </div>
        </b-form>
      </div>
    </div>
    <site-footer />
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  export default {
    components: { SiteFooter },
    data: () => ({
      roles: [
        { text: 'I am a Cable Partner. I want to get Gigs', value: 1 },
        { text: 'I am a customer. I am looking for Cable Partners', value: 2 },
      ],
      termsAndConds: false,
      form: {
        role: 1,
        email: '',
        password: '',
        password_confirmation: '',
      },
    }),
  }
</script>

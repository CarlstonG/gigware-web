<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p>Keep track of your</p>
        <p>working time with us.</p>
        <span>If you are a Cabling Partner team member and would like to access our tracking feature, please sign in below.</span>
        <tracker-registration-form class="mt-5"/>
        <div class="mt-5">
          Want to
          <b-link :to="{ name: 'tracker-login' }">Sign in </b-link>instead?
        </div>
      </div>
    </div>
    <site-footer />
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import TrackerRegistrationForm from '../components/TrackerRegistrationForm'

  export default {
    components: { SiteFooter, TrackerRegistrationForm },
    data: () => ({
      
    }),
  }
</script>

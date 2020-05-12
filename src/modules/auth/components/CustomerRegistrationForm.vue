<template>
  <b-form class="mt-5">
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
      <b-button variant="primary" size="lg" :disabled="!termsAndConds">Submit</b-button>
    </b-form-row>
  </b-form>
</template>

<script>
  export default {
    data: () => ({
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

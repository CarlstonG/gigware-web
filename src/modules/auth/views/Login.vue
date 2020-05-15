<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p class="mb-5">Log in and get more Gigs.</p>
        <validated-b-form-wrapper :validator="$v.form">
          <b-form @submit.prevent="submit">
            <validated-b-form-group
              name="email"
              label="Email"
              :disabled="formLocked"
            >
              <b-form-input v-model.trim.lazy="form.email" />
            </validated-b-form-group>
            <validated-b-form-group
              name="password"
              label="Password"
              :disabled="formLocked"
            >
              <b-form-input v-model.trim.lazy="form.password" type="password" />
            </validated-b-form-group>
            <div class="d-flex justify-content-between">
              <b-form-checkbox v-model="form.remember_me">
                Keep me logged in
              </b-form-checkbox>
              <b-link>Forgot password?</b-link>
            </div>
            <b-form-row class="justify-content-end mt-5">
              <b-progress-button
                size="lg"
                :disabled="formLocked"
                :state="formState"
                default-text="Submit"
              />
            </b-form-row>
          </b-form>
        </validated-b-form-wrapper>
        <div class="mt-5">
          Don't have an account?
          <b-link :to="{ name: 'register' }">Join</b-link>
          Gig Wire.
        </div>
      </div>
    </div>
    <site-footer />
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import validations from '../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions } from 'vuex'

  export default {
    components: { SiteFooter },
    mixins: [validateFormMixin],
    data: () => ({
      form: {
        email: '',
        password: '',
        remember_me: false,
      },
    }),
    validations: validations.login,
    methods: {
      ...mapActions('auth', ['login']),
      sendRequest() {
        this.login(this.form)
          .then(() => {
            this.$router.push({ name: 'provider.onboarding.basic-information' })
          })
          .catch(error => {
            this.handleServerError(error)
          })
          .finally(() => {
            this.setDefaultState()
          })
      },
    },
  }
</script>

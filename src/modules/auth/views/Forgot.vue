<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <h2 class="title">Forgot password?</h2>
        <div class="description"> Enter your email address and we'll send you instructions to reset your password.</div>
        <validated-b-form-wrapper :validator="$v.form" v-if="!isSuccess">
          <b-form @submit.prevent="submit">
            <validated-b-form-group
                name="email"
                label="Email"
                :disabled="formLocked"
            >
              <b-form-input v-model.trim.lazy="form.email"/>
            </validated-b-form-group>
            <b-form-row class="justify-content-end mt-5">
              <b-progress-button
                  size="lg"
                  :disabled="formLocked"
                  :state="formState"
                  default-text="Send Reset Instructions"
              />
            </b-form-row>
          </b-form>
        </validated-b-form-wrapper>
        <div class="description" v-if="isSuccess">
          Recovery email was successfully sent!
        </div>
        <div class="back-btn-wrapper">
          <b-button @click="$router.go(-1)" size="lg" variant="transparent" class="btn-back">
            <svg-icon name="arrow_prev"
                      class="left-icon"
                      :width="$screens({ default: '14' })"/>
            Go Back
          </b-button>
        </div>
      </div>
    </div>
    <site-footer/>
  </div>
</template>
<style scoped lang="scss" src="./Forgot.scss"></style>

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
      },
      isSuccess: false
    }),
    validations: validations.forgot,
    methods: {
      ...mapActions('auth', ['forgot']),
      sendRequest() {
        let that = this;
        return this.forgot(this.form)
          .then(() => {
            that.isSuccess = true;
          }).catch((e) => {
            this.toast(e.response?.data?.error || 'No user with such email was found')
          })
      },
    },
  }
</script>

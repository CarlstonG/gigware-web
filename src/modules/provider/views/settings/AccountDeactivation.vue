<template>
  <div class="account-deactivation">
    <div class="content-wrapper">
      <div class="title">
        Deactivate Account
      </div>
      <div class="description">
        Deactivate account Are you sure you want to deactivate your account?<br/>
        By doing this you will lose all of your saved data and will not be able to retrieve it.
      </div>
    </div>

    <b-progress-button
        size="lg"
        :disabled="formLocked"
        :state="formState"
        default-text="Deactivate"
        loading-text="Loading..."
        @click="deactivate">
    </b-progress-button>
  </div>
</template>
<style scoped lang="scss" src="./AccountDeactivation.scss"></style>

<script>
  import validateFormMixin from '@/core/mixins/validate-form-mixin'

  export default {
    mixins: [validateFormMixin],
    methods: {
      deactivate() {
        this.formState = 'loading';
        this.$store.dispatch('auth/deactivateAccount')
          .then(() => {
            this.$auth.logout();
          })
          .catch((err) => {
            this.serverError = err;
            if (this.statusCode === 403) {
              this.toast('You cannot deactivate this account');
            } else {
              this.handleServerError(err);
            }
          })
          .finally(() => {
            this.formState = 'default';
          })
      }
    },
  }
</script>

<template>
  <div class="confirmation">
    <div class="content-wrapper">
      <div class="title">
        Congratulations!
      </div>
      <div class="description">
        Great Job! Your account has now been created. You can update it at anytime in Your Profile.
        If you sent out any review requests, you will get an email when you have been reviewed.
      </div>
    </div>

    <steps-footer
        @click="goToProfile"
        :loading="formLocked"
        :state="formState"
    />
  </div>
</template>
<style scoped lang="scss" src="./Confirmation.scss"></style>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapGetters } from "vuex";

  export default {
    mixins: [validateFormMixin],
    components: { StepsFooter },
    methods: {
      goToProfile() {
        this.$router.push({ name: 'provider.profile', params: { id: this.user.provider_profile.id } })
      }
    },
    computed: {
      ...mapGetters('auth', ['user']),
    }
  }
</script>

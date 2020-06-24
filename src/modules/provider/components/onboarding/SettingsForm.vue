<template>
  <b-card no-body no-border>
    <b-card-header>
      <div class="card-header-title">{{ title }}</div>
      <div class="card-header-subtitle">{{ subtitle }}</div>
      <div class="card-header-steps" v-if="onboarding">
        <span class="steps">Step {{ currentStep }} of 8</span>
        <b-button v-if="skipAllowed"
                  variant="outline-light"
                  @click="goToNextStep">
          Skip This Step
        </b-button>
      </div>
    </b-card-header>
    <div class="settings-form">
      <slot/>
    </div>
  </b-card>
</template>
<style scoped lang="scss" src="./SettingsForm.scss"></style>

<script>
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'

  export default {
    mixins: [settingsSaveMixin],
    props: {
      onboarding: Boolean,
    },
    computed: {
      title() {
        return this.$route.meta.title
      },
      subtitle() {
        return this.$route.meta.subtitle
      },
      currentStep() {
        return this.$route.meta.step
      },
      skipAllowed() {
        return this.$route.matched.slice().reverse().find(r => r.meta.skipAllowed)?.meta?.skipAllowed && !this.isSettingsType;
      },
    },
  }
</script>

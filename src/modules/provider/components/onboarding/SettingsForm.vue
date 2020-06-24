<template>
  <b-card no-body no-border>
    <b-card-header>
      <div class="card-header-title">{{ title }}</div>
      <div class="card-header-subtitle">{{ subtitle }}</div>
    </b-card-header>
    <div class="settings-form">
      <slot/>
    </div>
  </b-card>
</template>
<style scoped lang="scss" src="./SettingsForm.scss"></style>

<script>
  export default {
    computed: {
      title() {
        return this.$route.meta.title
      },
      subtitle() {
        return this.$route.meta.subtitle
      }
    },
  }
</script>

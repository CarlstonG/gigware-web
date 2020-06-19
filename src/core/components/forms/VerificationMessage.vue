<template>
  <div v-if="show" class="verification-message">
    <div class="caution">The admin has declined this data.</div>
    <div class="reason">
      <span class="label">reason: </span>
      {{reason}}
    </div>
  </div>
</template>
<style scoped lang="scss" src="./VerificationMessage.scss"></style>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({
          is_accepted: null,
          reason: null,
          details: []
        })
      },
      name: {
        type: String,
        default: null
      },
      alias: {
        type: String,
        default: null
      }
    },
    computed: {
      show() {
        return (!this.name && this.value.is_accepted === false)
          || (
            this.value.details?.[this.name]?.is_accepted === false
            && (!this.alias || this.value.details?.[this.alias]?.is_accepted === false)
          );
      },
      reason() {
        return this.name ? this.value.details?.[this.name]?.reason : this.value.reason;
      }
    }
  }
</script>

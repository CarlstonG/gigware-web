<template>
  <div class="verification-tooltip">
    <div :id="'verification-tooltip-wrapper' + _uid"
         :class="'wrapper' + (isDeclined ? ' active' : '')">
      <slot></slot>
    </div>
    <b-tooltip :target="'verification-tooltip-wrapper' + _uid"
               :show="show && isDeclined"
               :disabled="!isDeclined"
               variant="danger">
      <div class="caution">Declined</div>
      <div class="reason" v-if="reason">
        <span class="label">reason: </span>
        {{reason}}
      </div>
    </b-tooltip>
  </div>
</template>
<style scoped lang="scss" src="./VerificationTooltip.scss"></style>

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
      },
      show: Boolean
    },
    computed: {
      isDeclined() {
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

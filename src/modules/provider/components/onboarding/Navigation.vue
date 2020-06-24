<template>
  <div>
    <b-dropdown no-caret variant="light" class="dropdown-nav d-lg-none">
      <template v-slot:button-content>
        <span class="select-text">{{currentStepLabel}}</span>
        <svg-icon class="caret-icon" name="search_caret"
                  width="11"></svg-icon>
      </template>
      <b-dropdown-item v-for="(step, index) in value"
                       :key="index"
                       :to="step.route"
                       :disabled="isMenuLinkDisabled(index)">
        {{ step.label }}
      </b-dropdown-item>
    </b-dropdown>
    <b-list-group :class="'d-none d-lg-block' + (onboarding ? ' onboarding' : '')">
      <b-list-group-item v-for="(step, index) in value"
                         :key="index"
                         :to="step.route"
                         :disabled="isMenuLinkDisabled(index)"
                         :class="{ done: index + 1 < $route.meta.step }">
        <span v-if="!onboarding" class="marker"><span class="marker-inner"></span></span>
        {{ step.label }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<style scoped lang="scss" src="./Navigation.scss"></style>

<script>
  import { mapGetters } from "vuex";

  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },
      onboarding: Boolean,
    },
    computed: {
      ...mapGetters('auth', ['user']),
      currentStepLabel() {
        return this.value.find(item => item.route.name === this.$route.name)?.label
      },
    },
    methods: {
      isMenuLinkDisabled(index) {
        return index > 0 && !this.user?.provider_profile || index > 1 && !this.user?.provider_profile?.address
      }
    }
  }
</script>

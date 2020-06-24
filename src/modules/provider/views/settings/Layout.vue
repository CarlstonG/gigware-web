<template>
  <div class="settings">
    <b-container>
      <b-row>
        <b-col lg="2">
          <div class="settings-header">Settings</div>
          <b-dropdown no-caret variant="light" class="dropdown-nav d-lg-none">
            <template v-slot:button-content>
              <span class="select-text">{{currentStepLabel}}</span>
              <svg-icon class="caret-icon" name="search_caret"
                        width="11"></svg-icon>
            </template>
            <b-dropdown-item v-for="(step, index) in steps"
                             :key="index"
                             :to="step.route"
                             :disabled="isMenuLinkDisabled(index)">
              {{ step.label }}
            </b-dropdown-item>
          </b-dropdown>
          <b-list-group class="d-none d-lg-block">
            <b-list-group-item v-for="(step, index) in steps"
                               :key="index"
                               :to="step.route"
                               :disabled="isMenuLinkDisabled(index)">
              <span class="marker"><span class="marker-inner"></span></span>
              {{ step.label }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col lg="10">
          <b-card no-body class="border-0">
            <b-card-header class="pt-4 pb-4 pl-5 pr-5">
              <div class="card-header-title">{{ title }}</div>
              <div class="card-header-subtitle">{{ subtitle }}</div>
            </b-card-header>
            <div class="settings-form">
              <router-view/>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data: () => ({
      steps: [
        {
          label: 'Basic Information',
          route: { name: 'provider.settings.basic-information' },
        },
        {
          label: 'Rates And Location',
          route: { name: 'provider.settings.rates-and-location' },
        },
        {
          label: 'Availability',
          route: { name: 'provider.settings.availability' },
        },
        {
          label: 'Licenses',
          route: { name: 'provider.settings.licenses' },
        },
        {
          label: 'Experience',
          route: { name: 'provider.settings.experience' },
        },
        {
          label: 'Proof of insurance',
          route: { name: 'provider.settings.proof-of-insurance' },
        },
        {
          label: 'Ratings & Reviews',
          route: { name: 'provider.settings.ratings-and-reviews' },
        },
        {
          label: 'Deactivate Account',
          route: { name: 'provider.settings.deactivate-account' },
        },
      ],
    }),
    computed: {
      ...mapGetters('auth', ['user']),
      title() {
        return this.$route.meta.title
      },
      subtitle() {
        return this.$route.meta.subtitle
      },
      currentStep() {
        return this.$route.meta.step
      },
      currentStepLabel() {
        return this.steps.find(item => item.route.name === this.$route.name)?.label
      },
    },
    methods: {
      isMenuLinkDisabled(index) {
        return index > 0 && !this.user?.provider_profile || index > 1 && !this.user?.provider_profile?.address
      }
    }
  }
</script>

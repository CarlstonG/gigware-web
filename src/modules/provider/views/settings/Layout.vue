<template>
  <div class="settings">
    <b-container>
      <b-row>
        <b-col lg="2">
          <div class="settings-header">Settings</div>
          <b-list-group>
            <b-list-group-item v-for="(step, index) in steps" :key="index" :to="step.route">
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
            <div class="p-5">
              <router-view/>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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
      title() {
        return this.$route.meta.title
      },
      subtitle() {
        return this.$route.meta.subtitle
      },
      currentStep() {
        return this.$route.meta.step
      },
    },
  }
</script>

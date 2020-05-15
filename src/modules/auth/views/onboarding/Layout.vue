<template>
  <div class="onboarding">
    <b-container>
      <b-row>
        <b-col lg="2">
          <div class="steps-header">Steps {{ currentStep }} of 8</div>
          <b-list-group>
            <b-list-group-item
              v-for="(step, index) in steps"
              :key="index"
              :to="step.route"
              :class="{ done: index + 1 < $route.meta.step }"
            >
              {{ step.label }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col lg="10">
          <b-card no-body class="border-0">
            <b-card-header class="pt-4 pb-4 pl-5 pr-5">
              <div class="card-hreader-title">{{ title }}</div>
              <div class="card-header-subtitle">{{ subtitle }}</div>
            </b-card-header>
            <div class="p-5">
              <router-view />
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
          route: { name: 'onboarding.basic-information' },
        },
        {
          label: 'Rates And Location',
          route: { name: 'onboarding.rates-and-location' },
        },
        {
          label: 'Availability',
          route: { name: 'onboarding.availability' },
        },
        {
          label: 'Licenses',
          route: { name: 'onboarding.licenses' },
        },
        {
          label: 'Experience',
          route: { name: 'onboarding.experience' },
        },
        {
          label: 'Proof of insurance',
          route: { name: 'onboarding.proof-of-insurance' },
        },
        {
          label: 'Ratings & Reviews',
          route: { name: 'onboarding.ratings-and-reviews' },
        },
        {
          label: 'Confirmation',
          route: { name: 'onboarding.confirmation' },
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

<template>
  <div class="onboarding settings">
    <b-container>
      <b-row>
        <b-col lg="2">
          <div class="settings-header">Steps {{ currentStep }} of 8</div>
          <navigation onboarding :value="steps"/>
        </b-col>
        <b-col lg="10">
          <settings-form>
            <router-view/>
          </settings-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Navigation from "../../components/onboarding/Navigation";
  import SettingsForm from "../../components/onboarding/SettingsForm";

  export default {
    components: { SettingsForm, Navigation },
    data: () => ({
      steps: [
        {
          label: 'Basic Information',
          route: { name: 'provider.onboarding.basic-information' },
        },
        {
          label: 'Rates And Location',
          route: { name: 'provider.onboarding.rates-and-location' },
        },
        {
          label: 'Availability',
          route: { name: 'provider.onboarding.availability' },
        },
        {
          label: 'Licenses',
          route: { name: 'provider.onboarding.licenses' },
        },
        {
          label: 'Experience',
          route: { name: 'provider.onboarding.experience' },
        },
        {
          label: 'Proof of insurance',
          route: { name: 'provider.onboarding.proof-of-insurance' },
        },
        {
          label: 'Ratings & Reviews',
          route: { name: 'provider.onboarding.ratings-and-reviews' },
        },
        {
          label: 'Confirmation',
          route: { name: 'provider.onboarding.confirmation' },
        },
      ],
    }),
    computed: {
      currentStep() {
        return this.$route.meta.step
      },
    },
  }
</script>

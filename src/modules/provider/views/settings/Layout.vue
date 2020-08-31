<template>
  <div class="settings">
    <b-container>
      <b-row>
        <b-col lg="2">
          <div class="settings-header">Settings</div>
          <navigation :value="steps"/>
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
          label: 'References',
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
  }
</script>

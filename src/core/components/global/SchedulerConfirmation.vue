<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p>Thanks for scheduling an onboarding interview with GigWire.</p>
        <p>We look forward to seeing how we can connect you with more gigs!</p>
        <b-form-radio-group class="mt-5" v-model="selectedRole" :options="roles" stacked />
      </div>
    </div>
    <!-- <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"> -->
    <site-footer />
  </div>
</template>

<script>
import { default as SiteFooter } from "@/core/components/global/Footer";

export default {
  components: { SiteFooter },
  data() {
    return {};
  },
};
</script>

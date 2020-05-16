<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button variant="link" size="lg">
      {{ isFirstStep ? '' : 'Back' }}
    </b-button>
    <b-progress-button
      size="lg"
      :disabled="loading"
      :state="state"
      default-text="Next"
      loading-text="Loading..."
    />
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    computed: {
      isFirstStep() {
        return this.$route.meta.step == 1
      },
    },
  }
</script>

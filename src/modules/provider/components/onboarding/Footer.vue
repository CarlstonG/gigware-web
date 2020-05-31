<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button @click="$router.go(-1)" variant="link" size="lg" class="p-0">
      {{ isFirstStep ? '' : 'Back' }}
    </b-button>
    <div>
      <b-button
        @click="$emit('skip')"
        variant="link"
        class="p-0"
        size="lg"
        v-if="optional"
      >
        Skip
      </b-button>
      <b-progress-button
        class="ml-5"
        size="lg"
        :disabled="loading"
        :state="state"
        :default-text="nextBtnText"
        loading-text="Loading..."
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      optional: {
        default: false,
      },
      nextBtnText: {
        type: String,
        default: 'Next',
      },
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
        return this.$route.meta.step === 1
      },
    },
  }
</script>

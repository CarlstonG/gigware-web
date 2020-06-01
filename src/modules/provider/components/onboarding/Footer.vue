<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button @click="$router.go(-1)" variant="link" size="lg" class="p-0">
      {{ isFirstStep || isSettingsType ? '' : 'Back' }}
    </b-button>
    <div>
      <b-button
          @click="onSkip($event)"
          variant="link"
          class="p-0"
          size="lg"
          v-if="optional && !isSettingsType"
      >
        Skip
      </b-button>
      <b-progress-button
          class="ml-5"
          size="lg"
          :disabled="loading"
          :state="state"
          :default-text="nextBtnTextFromMeta"
          loading-text="Loading..."
      />
    </div>
  </div>
</template>

<script>
  const nextBtnDefaultText = 'Next';

  export default {
    props: {
      optional: {
        default: false,
      },
      nextBtnText: {
        type: String,
        default: nextBtnDefaultText,
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
      isSettingsType() {
        return this.$route.matched.some(r => r.meta.type === 'settings')
      },
      nextBtnTextFromMeta() {
        return this.nextBtnText !== nextBtnDefaultText ?
          this.nextBtnText :
          this.$route.matched.find(r => r.meta.nextBtnText)?.meta?.nextBtnText || this.nextBtnText
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e)
      },
      onSkip(e) {
        this.$emit('skip', e)
      }
    }
  }
</script>

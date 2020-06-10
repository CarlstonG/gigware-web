<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button v-if="!isFirstStep && !isSettingsType"
              @click="$router.go(-1)" size="lg" variant="transparent" class="btn-back">
      <svg-icon name="arrow_prev"
                class="left-icon"
                :width="$screens({ default: '11' })"/>
      Back
    </b-button>
    <span v-else>&nbsp;</span>
    <div class="d-flex">
      <b-button
          @click="onSkip($event)"
          variant="transparent"
          size="lg"
          v-if="optional && !isSettingsType"
      >
        Skip
      </b-button>
      <b-progress-button
          size="lg"
          :disabled="loading"
          :state="state"
          :default-text="nextBtnTextFromMeta"
          loading-text="Loading...">
        <template v-if="!isSettingsType && state === 'default'" v-slot:icon>
          <svg-icon name="next_page"
                    class="right-icon"
                    :width="$screens({ default: '11'})"/>
        </template>
      </b-progress-button>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./Footer.scss"></style>


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
          this.$route.matched.slice().reverse().find(r => r.meta.nextBtnText)?.meta?.nextBtnText
          || this.nextBtnText
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

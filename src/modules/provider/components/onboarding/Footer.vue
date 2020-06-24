<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button v-if="!isFirstStep && !isSettingsType"
              @click="goBack" size="lg" variant="transparent" class="btn-back">
      <svg-icon name="arrow_prev"
                class="left-icon"
                :width="$screens({ default: '14' })"/>
      Back
    </b-button>
    <span v-else>&nbsp;</span>
    <div class="d-flex">
      <b-button
          @click="onSkip($event)"
          variant="transparent"
          size="lg"
          v-if="skipAllowed"
      >
        Skip
      </b-button>
      <b-progress-button
          size="lg"
          @click="onClick($event)"
          :disabled="loading"
          :state="state"
          :default-text="nextBtnTextFromMeta"
          loading-text="Loading...">
        <template v-if="!isSettingsType && state === 'default'" v-slot:icon>
          <svg-icon name="next_page"
                    class="right-icon"
                    :width="$screens({ default: '14'})"/>
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
      },
      skipAllowed() {
        return this.$route.matched.slice().reverse().find(r => r.meta.skipAllowed)?.meta?.skipAllowed && !this.isSettingsType;
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e)
      },
      onSkip(e) {
        this.$emit('skip', e)
      },
      goBack() {
        const backRedirect = this.$route.matched.find(r => r.meta.backRedirect)?.meta?.backRedirect;
        if (backRedirect) {
          this.$router.push(backRedirect)
        }
      }
    }
  }
</script>

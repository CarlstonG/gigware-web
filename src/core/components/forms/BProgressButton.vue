<template>
  <b-button
    :type="type"
    :disabled="disabled || isTransitioning"
    :variant="variant"
    :size="size"
    class="__progress-button"
    :class="[{ 'is-transitioning' : isTransitioning }, state]"
    @click="$emit('click', $event)">
    <div class="__progress-button-content d-flex align-items-center">
      <b-spinner class="mt-1 mr-2" small type="grow" v-if="loadingState"></b-spinner>
      <span class="sr-only">{{ stateText }}</span>
      {{ stateText }}
    </div>

    <div class="__progress-button-content-success" :class="{ 'enter' : successStateEnter, 'exit' : successStateExit }">
      <svg-icon name="white-circle-green-tick" width="22" />
    </div>

    <div class="__progress-button-content-error" :class="{ 'enter' : errorStateEnter, 'exit' : errorStateExit }">
      <svg-icon name="white-circle-red-cross" width="22" />
    </div>
  </b-button>
</template>

<script>
export default {
  name: 'b-progress-button',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'lg',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'submit'
    },
    state: {
      type: String,
      default: 'default'
    },
    defaultText: {
      type: String,
      default: 'Save'
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    }
  },
  computed: {
    stateText () {
      return this.state === 'loading' ? this.loadingText : this.defaultText
    },
    defaultState () {
      return this.state === 'default'
    },
    loadingState () {
      return this.state === 'loading'
    },
    isTransitioning () {
      return this.successStateEnter || this.successStateExit || this.errorStateEnter || this.errorStateExit
    }
  },
  data () {
    return {
      successStateEnter: false,
      successStateExit: false,
      errorStateEnter: false,
      errorStateExit: false,
    }
  },
  methods: {
    success () {
      this.successStateEnter = true
      setTimeout(() => {
        this.successStateEnter = false
        this.successStateExit = true
        setTimeout(() => {
          this.successStateExit = false
        }, 500)
      }, 1000);
    },
    error () {
      this.errorStateEnter = true
      setTimeout(() => {
        this.errorStateEnter = false
        this.errorStateExit = true
        setTimeout(() => {
          this.errorStateExit = false
        }, 500)
      }, 1000);
    },
  },
  watch: {
    state () {
      if (this.state === "success") {
        this.success()
      } else if (this.state === "error") {
        this.error()
      }
    }
  }
}
</script>

<template>
  <b-form-group
    :invalid-feedback="errorMessage"
    :state="isFullyValid"
    :label="label"
  >
    <slot :attrs="{ state: isFullyValid }" />
  </b-form-group>
</template>
<script>
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'

  export default {
    name: 'ValidatedFormGroup',
    extends: singleErrorExtractorMixin,
    props: {
      serverErrors: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      errorMessage() {
        if (this.hasErrors) {
          return this.firstErrorMessage
        }

        if (this.serverErrors.length) {
          return this.serverErrors[0]
        }

        return ''
      },
      hasAnyErrors() {
        return this.hasErrors || this.serverErrors.length
      },
      isFullyValid() {
        return this.isValid && !this.serverErrors.length
      },
    },
  }
</script>

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
    watch: {
      '$parent.serverErrors': function (v) {
        console.log('$parent.serverErrors', v);
      }
    },
    computed: {
      errorMessage() {
        if (this.hasErrors) {
          return this.firstErrorMessage
        }

        if (this.serverErrors.length) {
          return this.serverErrors[0]
        }

        // fixme: make this better way
        // todo: rewrite form validation, nested data(form.address.city) should be set as 'address.city' to form-group name
        // console.log('errorMessage', this.name, this.$parent?.$parent?.serverErrors?.[this.name]?.[0])
        return this.$parent?.$parent?.serverErrors?.[this.name]?.[0] || ''
      },
      hasAnyErrors() {
        return this.hasErrors || this.serverErrors.length || this.$parent?.$parent?.serverErrors?.[this.name]?.[0]
      },
      isFullyValid() {
        // this.isValid === null means it's valid
        return (this.isValid === null || !!this.isValid) && !this.serverErrors.length && !this.$parent?.$parent?.serverErrors?.[this.name]?.[0]
      },
    }
  }
</script>

<template>
  <v-date-picker
      mode="range"
      is-expanded
      is-inline
      :columns="columns"
      :min-date="minDate"
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: "AvailabilityPicker",
    inheritAttrs: false,
    props: {
      value: {
        default: null
      },
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      columns() {
        return this.$attrs.columns || this.$root.$screens({ default: 1, lg: 3 })
      },
      minDate() {
        return this.$attrs.minDate || new Date()
      },
    },
  }
</script>

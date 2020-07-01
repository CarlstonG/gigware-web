<template>
  <v-date-picker
      v-bind:value="selectValue"
      v-on:input="onInput"
  />
</template>

<script>
  export default {
    props: {
      value: {
        default: null
      },
    },
    data() {
      return {
        selectValue: this.convertDate(this.value),
      }
    },
    watch: {
      value: function (v) {
        this.selectValue = this.convertDate(v);
      }
    },
    methods: {
      onInput(e) {
        if (!e) return;

        this.$emit('input', e.toUTCTimezone())
      },
      convertDate(date) {
        if (!date) return date;

        return date.fromUTCTimezone();
      }
    }
  }
</script>

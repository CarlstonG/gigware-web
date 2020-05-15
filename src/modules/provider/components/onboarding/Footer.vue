<template>
  <div class="mt-5 d-flex justify-content-between">
    <b-button variant="link" size="lg">{{ isFirst ? '' : 'Back' }}</b-button>
    <b-button variant="primary" size="lg" @click="$emit('next')">
      Next
    </b-button>
  </div>
</template>

<script>
  export default {
    computed: {
      isFirst() {
        return this.$route.meta.step == 1
      },
    },
  }
</script>

<template>
  <b-modal v-model="isOpen" modal-class="image-modal">
    <template v-slot:default="{ close }">
      <div class="img-wrapper" @click="close">
        <img :src="image.url" alt=""/>
      </div>
    </template>
  </b-modal>
</template>
<style scoped lang="scss" src="./ImagePopup.scss"></style>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        isOpen: !!this.value,
        image: this.value
      }
    },
    watch: {
      value(v) {
        this.isOpen = !!v;
        this.image = v;
      },
    },
    computed: {
      imageUrl() {
        return this.image?.image?.url || null
      },
      name() {
        return this.image?.name || null
      }
    },
    methods: {}
  }
</script>

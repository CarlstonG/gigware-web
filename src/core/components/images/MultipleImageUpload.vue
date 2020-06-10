<template>
  <div>
    <slot
        v-if="uploadedImages.length"
        name="image-uploaded"
        v-bind="{ uploadedImages, srcImages, openFileDialog, removeImage }"
    />
    <slot v-else-if="srcImages.length" name="image" v-bind="{ srcImages, openFileDialog, removeImage }"/>
    <slot v-else name="no-image" v-bind="{ openFileDialog }"/>
    <input
        class="d-none"
        type="file"
        accept="image/jpeg, image/png"
        ref="fileInput"
        @change="filesUploaded"
        multiple
    />
  </div>
</template>

<script>
  export default {
    name: 'MultipleImageUpload',
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        images: this.value,
      }
    },
    watch: {
      value(v) {
        this.images = v;
      },
    },
    computed: {
      srcImages() {
        return this.images.filter(img => !(img instanceof File))
      },
      uploadedImages() {
        return this.images.filter(img => img instanceof File)
      }
    },
    methods: {
      openFileDialog() {
        this.$refs.fileInput.click()
      },
      removeImage(index) {
        // if (this.images[index]?.url) return;

        this.images.splice(index, 1)
        this.$emit('image-removed', index)
      },
      filesUploaded(event) {
        if (event.target.files.length === 0) return

        event.target.files.forEach(file => {
          this.readUploadedFile(file)
        })
      },
      readUploadedFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = event => {
          let image = { file, src: event.target.result }
          this.images.push(image)

          this.$emit('image-uploaded', image)
        }
      },
    },
  }
</script>

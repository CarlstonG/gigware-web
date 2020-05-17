<template>
  <div>
    <slot
      v-if="images.length"
      name="image-uploaded"
      v-bind="{ images, openFileDialog, removeImage }"
    />
    <slot v-else name="no-image" v-bind="{ openFileDialog }" />
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
    data: () => ({
      images: [],
    }),
    methods: {
      openFileDialog() {
        this.$refs.fileInput.click()
      },
      removeImage(index) {
        this.images.splice(index, 1)
        this.$emit('image-removed', index)
      },
      filesUploaded(event) {
        if (event.target.files.length == 0) return

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

<template>
  <div>
    <slot v-if="src" name="image-uploaded" v-bind="{ src, openFileDialog }" />
    <slot v-else-if="imgSrc" name="image" v-bind="{ imgSrc, openFileDialog }"/>
    <slot v-else name="no-image" v-bind="{ openFileDialog }" />
    <input
      class="d-none"
      type="file"
      accept="image/jpeg, image/png"
      ref="fileInput"
      @change="fileUploaded"
    />
  </div>
</template>

<script>
  export default {
    name: 'ImageUpload',
    props: {
      imgSrc: {
        type: String,
        default: null
      }
    },
    data: () => ({
      src: '',
      file: null
    }),
    methods: {
      openFileDialog() {
        this.$refs.fileInput.click()
      },
      fileUploaded(event) {
        if (event.target.files.length == 0) return

        this.file = event.target.files[0]

        this.readUploadedFile()
      },
      readUploadedFile() {
        this.errorMsg = ''

        let reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = event => {
          this.src = event.target.result

          this.$emit('input', this.file)
        }
      },
    },
    created() {
      console.log(this.imgSrc)
    }
  }
</script>

<template>
  <div class="image-upload">
    <div :class="'image-container' + (dragging ? ' dragging' : '')"
         @drop.stop.prevent="fileDropped"
         @dragover.prevent="dragging=true"
         @dragleave="dragging=false">
      <slot v-if="src" name="image-uploaded" v-bind="{ src, openFileDialog, fileDropped }">
        <vue-cropper
            ref="cropper"
            :src="src"
            :img-style="cropperImageStyle"
            :modal="true"
            :guides="false"
            :background="true"
            :dragMode="'move'"
            :autoCropArea="1"
            :aspect-ratio="cropperAspectRatio"
        />
      </slot>

      <slot v-else-if="imgSrc" name="image" v-bind="{ imgSrc, openFileDialog, fileDropped }">
        <div class="state-image" @click="openFileDialog">
          <img :src="imgSrc" class="img-fluid img-thumbnail" alt=""/>
        </div>
      </slot>

      <slot v-else name="no-image" v-bind="{ openFileDialog, fileDropped }">
        <div class="state-no-image">
          <div class="icon-container">
            <svg-icon name="upload_icon" width="30"/>
          </div>
          <div class="info">Drag an Image to upload</div>
          <b-button variant="primary" size="sm" @click="openFileDialog">
            Choose an Image
          </b-button>
        </div>
      </slot>
    </div>
    <div class="tip-container" v-if="tips[imgState]">
      <strong>Tip:</strong>
      {{ tips[imgState] }}
    </div>
    <div class="button-container" v-if="src || imgSrc">
      <b-button
          variant="primary"
          size="sm"
          @click="openFileDialog"
      >
        Choose an Image
      </b-button>
    </div>

    <input
        class="d-none"
        type="file"
        accept="image/jpeg, image/png"
        ref="fileInput"
        @change="fileUploaded"
    />
  </div>
</template>
<style scoped lang="scss" src="./ImageUpload.scss"></style>

<script>
  export default {
    name: 'ImageUpload',
    props: {
      imgSrc: {
        type: String,
        default: null
      },
      cropperImageStyle: {
        type: Object,
        default: () => ({ 'object-fit': 'contain', 'max-height': '50vh' })
      },
      cropperAspectRatio: {
        type: Number,
        default: NaN
      },
      tips: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      src: '',
      file: null,
      dragging: false,
    }),
    methods: {
      openFileDialog() {
        this.$refs.fileInput.click()
      },
      fileDropped(event) {
        this.dragging = false

        let droppedFiles = event.dataTransfer.files;
        if (!droppedFiles) return;

        this.file = droppedFiles[0]

        this.readUploadedFile()
      },
      fileUploaded(event) {
        if (!event.target.files.length) return

        this.file = event.target.files[0]

        this.readUploadedFile()
      },
      readUploadedFile() {
        let reader = new FileReader()
        reader.onload = event => {
          this.src = event.target.result

          this.$refs.cropper?.replace(this.src);

          this.$emit('input', this.file)
        }

        reader.readAsDataURL(this.file)
      },
      resetUploadedFile() {
        this.$refs.fileInput.value = null;
        this.file = null;
        this.src = '';
        this.$emit('input', this.file);
      },
      async getCroppedBlob(options = {}) {
        if (this.file instanceof File && this.$refs.cropper) {
          return new Promise(resolve => {
            this.$refs.cropper
              .getCroppedCanvas(options)
              .toBlob(blob => resolve(blob), 'image/jpeg', 0.8);
          });
        }
        return Promise.resolve();
      },
    },
    computed: {
      imgState() {
        return this.src ? 'uploaded' : this.imgSrc ? 'image' : 'no-image';
      }
    }
  }
</script>

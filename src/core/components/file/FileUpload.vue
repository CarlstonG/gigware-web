<template>
  <div class="file-upload">
    <div :class="'image-container' + (dragging ? ' dragging' : '')"
         @drop.stop.prevent="fileDropped"
         @dragover.prevent="dragging=true"
         @dragleave="dragging=false">
      <slot v-if="src && getImageType() !== 'pdf'" name="image-uploaded" v-bind="{ src, openFileDialog, fileDropped }">
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

      <slot v-else-if="getImageType() === 'pdf'" name="image" v-bind="{ fileSrc, openFileDialog, fileDropped }">
        <pdf-large
          :file-src="this.fileSrc || this.src"
          :with-controls="true"
        />
      </slot>

      <slot v-else-if="fileSrc" name="image" v-bind="{ fileSrc, openFileDialog, fileDropped }">
        <a :href="getImageUrl()" target="_blank">
          <div class="state-image" @click="openFileDialog">
            <img :src="getImageIcon()" class="img-fluid img-thumbnail" alt=""/>
          </div>
        </a>
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
    <div class="button-container" v-if="src || fileSrc">
      <b-button
              variant="primary"
              size="sm"
              @click="openFileDialog"
      >
        Choose a File
      </b-button>
    </div>

    <input
            class="d-none"
            type="file"
            :accept="inputAccept"
            ref="fileInput"
            @change="fileUploaded"
    />
  </div>
</template>
<style scoped lang="scss" src="./FileUpload.scss"></style>

<script>
  import PdfLarge from './viewer/PdfLarge'
  export default {
    name: 'FileUpload',
    components: {
      PdfLarge
    },
    props: {
      fileSrc: {
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
      },
      acceptableFormats: {
        type: String,
        default: 'image'
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
        if (!(this.file instanceof File))
          return
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
        if (this.file instanceof File) {
          if (this.$refs.cropper) {
            return new Promise(resolve => {
              this.$refs.cropper
                      .getCroppedCanvas(options)
                      .toBlob(blob => resolve(blob), 'image/jpeg', 0.8);
            });
          } else {
            return new Promise(resolve => {
              resolve(this.file);
            });
          }
        }
        return Promise.resolve();
      },
      getImageIcon() {
        if (this.getImageType() === 'pdf') {
          return '/images/pdf.svg'
        } else {
          return this.fileSrc
        }
      },
      getImageUrl() {
        return this.fileSrc;
      },
      getImageType() {
        let imageSrc = this.fileSrc;
        if (imageSrc) {
          if (imageSrc.match(/.*\.pdf$/)) {
            return 'pdf'
          } else {
            return 'image'
          }
        } else if (this.file){
          if (this.file?.type === 'application/pdf') {
            return 'pdf'
          } else {
            return 'imahe'
          }
        }
      }
    },
    computed: {
      imgState() {
        return this.src ? 'uploaded' : this.fileSrc ? 'image' : 'no-image';
      },
      inputAccept() {
        let formats = this.acceptableFormats.split(',').map((s) => s.trim());
        let mimes = {
          'image': 'image/jpeg, image/png',
          'pdf': 'application/pdf'
        };
        return formats.map(s => mimes[s]).filter(e => e).join(',')
      }
    }
  }
</script>

<template>
  <div>
    <b-form @submit.prevent="submit">
      <div
        v-for="(certificate, index) in certificates"
        :key="index"
        class="mb-2 form-inline"
      >
        <b-form-checkbox v-model="certificate.checked" class="mr-5">
          {{ certificate.name }}
        </b-form-checkbox>

        <label :for="`team-members-${index}`" class="mr-2">Is held by</label>
        <b-form-input
          :id="`team-members-${index}`"
          v-model.trim.lazy="certificate.team_members_count"
          class="mr-2"
          style="max-width: 94px"
          :disabled="!certificate.checked"
        />
        <span class="mr-5">
          team members
        </span>

        <multiple-image-upload
          @image-uploaded="addImage(certificate, $event)"
          @image-removed="deleteImage(certificate, $event)"
        >
          <template #no-image="{ openFileDialog }">
            <b-button
              variant="primary"
              @click="openFileDialog"
              :disabled="!certificate.checked"
            >
              <svg-icon name="caret" width="21" class="mr-4" />
              Upload Certificate
            </b-button>
          </template>
          <template #image-uploaded="{ removeImage, openFileDialog }">
            <b-button
              variant="primary"
              @click="openFileDialog"
              class="mr-3"
              :disabled="!certificate.checked"
            >
              <svg-icon name="caret" width="21" class="mr-4" />
              Upload Certificate
            </b-button>
            <div
              v-for="(image, index) in certificate.images"
              :key="index"
              class="d-inline-block position-relative"
            >
              <img
                :src="image.src"
                class="mr-1"
                style="object-fit: cover; width: 24px; height: 33px"
              />
              <b-link
                style="position: absolute; top: 2px; right: 6px; line-height: 0px;"
                @click="removeImage(index)"
              >
                <svg-icon name="close_icon" width="4" height="4" />
              </b-link>
            </div>
          </template>
        </multiple-image-upload>
      </div>
      <steps-footer :loading="formLocked" :state="formState" />
    </b-form>
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import MultipleImageUpload from '@/core/components/images/MultipleImageUpload'
  import { mapActions } from 'vuex'

  const DEFAULT_CERTIFICATE_COUNT = 7

  export default {
    components: { StepsFooter, MultipleImageUpload },
    data: () => ({
      formLocked: false,
      formState: 'default',
      certificates: [],
    }),
    methods: {
      ...mapActions('provider', ['createCertificates']),
      submit() {
        this.formState = 'loading'
        this.createCertificates(this.getCheckedCertificates())
          .then(() => {
            this.$router.push({ name: 'provider.onboarding.experience' })
          })
          .finally(() => {
            this.formState = 'default'
          })
      },
      getCheckedCertificates() {
        let form = new FormData()
        this.checkedCertificates.forEach((certificate, index) => {
          form.append(
            `certificates[${index}][team_members_count]`,
            certificate.team_members_count,
          )
          certificate.images.map(image => {
            form.append(`certificates[${index}][images][]`, image.file)
          })
        })
        return form
      },
      addImage(certificate, image) {
        certificate.images.push(image)
      },
      deleteImage(certificate, index) {
        certificate.images.splice(index, 1)
      },
      initCertificates() {
        for (let i = 0; i < DEFAULT_CERTIFICATE_COUNT; i++) {
          this.certificates.push(this.emptyCertificate())
        }
      },
      emptyCertificate() {
        return {
          name: 'Certificate',
          checked: false,
          team_members_count: 0,
          images: [],
        }
      },
    },
    computed: {
      checkedCertificates() {
        return this.certificates.filter(certificate => certificate.checked)
      },
    },
    created() {
      this.initCertificates()
    },
  }
</script>

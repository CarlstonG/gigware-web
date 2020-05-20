<template>
  <div>
    <b-form @submit.prevent="submit">
      <div
        v-for="(certificate, index) in certificates"
        :key="index"
        class="mb-2 form-inline"
      >
        <b-form-checkbox
          v-model="certificate.checked"
          class="mr-5 justify-content-start"
          style="min-width: 320px"
        >
          <div v-if="certificate.isCustom" class="position-relative">
            <b-form-input
              v-model.trim.lazy="certificate.name"
              class="mr-2 w-100"
              :disabled="!certificate.checked"
            />
            <b-link @click="removeCertificate(index)" style="position: absolute; top: 5px; right: -20px;">
              <svg-icon name="close_icon" color="red" width="8" height="8" />
            </b-link>
          </div>
          <span v-else>{{ certificate.name }}</span>
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
              <svg-icon name="upload_icon" width="21" class="mr-4" />
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
      <b-link @click="addCustomCertificate">+ Add New Certificate</b-link>
      <steps-footer :loading="formLocked" :state="formState" />
    </b-form>
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import MultipleImageUpload from '@/core/components/images/MultipleImageUpload'
  import { mapActions } from 'vuex'

  const CERTIFICATES = [
    'Hubbell Certification',
    'Panduit Certification',
    'Leviton Certification',
    'SYSTIMAX Certification',
    'Belden Certification',
    'CommScope Certification',
    'Certified Cabling Test Technician - Copper',
    'Certified Cabling Test Technician - Fiber',
  ]

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
          form.append(`certificates[${index}][name]`, certificate.name)
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
        CERTIFICATES.forEach(certificate => {
          this.certificates.push(this.emptyCertificate(certificate))
        })
      },
      emptyCertificate(name = '') {
        return {
          name,
          checked: false,
          team_members_count: 0,
          images: [],
          isCustom: false,
        }
      },
      addCustomCertificate() {
        let certificate = this.emptyCertificate()
        certificate.isCustom = true

        this.certificates.push(certificate)
      },
      removeCertificate(index) {
        this.certificates.splice(index, 1)
      }
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

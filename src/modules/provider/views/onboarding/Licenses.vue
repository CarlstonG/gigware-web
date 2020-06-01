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
              <svg-icon name="close_icon" color="red" width="8" height="8"/>
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

        <multiple-image-upload v-model="certificate.images">
          <template #no-image="{ openFileDialog }">
            <b-button
                variant="primary"
                @click="openFileDialog"
                :disabled="!certificate.checked"
            >
              <svg-icon name="upload_icon" width="21" class="mr-4"/>
              Upload Certificate
            </b-button>
          </template>
          <template #image="{ removeImage, openFileDialog }">
            <b-button
                variant="primary"
                @click="openFileDialog"
                class="mr-3"
                :disabled="!certificate.checked"
            >
              <svg-icon name="caret" width="21" class="mr-4"/>
              Upload Certificate
            </b-button>
            <div
                v-for="(image, index) in certificate.images"
                :key="index"
                class="d-inline-block position-relative"
            >
              <img
                  :src="image.src || image.url"
                  class="mr-1"
                  style="object-fit: cover; width: 24px; height: 33px"
              />
              <b-link
                  style="position: absolute; top: 2px; right: 6px; line-height: 0;"
                  @click="removeImage(index)"
              >
                <svg-icon name="close_icon" width="4" height="4"/>
              </b-link>
            </div>
          </template>
          <template #image-uploaded="{ removeImage, openFileDialog }">
            <b-button
                variant="primary"
                @click="openFileDialog"
                class="mr-3"
                :disabled="!certificate.checked"
            >
              <svg-icon name="caret" width="21" class="mr-4"/>
              Upload Certificate
            </b-button>
            <div
                v-for="(image, index) in certificate.images"
                :key="index"
                class="d-inline-block position-relative"
            >
              <img
                  :src="image.src || image.url"
                  class="mr-1"
                  style="object-fit: cover; width: 24px; height: 33px"
              />
              <b-link
                  style="position: absolute; top: 2px; right: 6px; line-height: 0px;"
                  @click="removeImage(index)"
              >
                <svg-icon name="close_icon" width="4" height="4"/>
              </b-link>
            </div>
          </template>
        </multiple-image-upload>
      </div>
      <b-link @click="addCustomCertificate">+ Add New Certificate</b-link>
      <steps-footer :loading="formLocked" :state="formState"/>
    </b-form>
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import MultipleImageUpload from '@/core/components/images/MultipleImageUpload'
  import { mapActions, mapGetters } from 'vuex'

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
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { StepsFooter, MultipleImageUpload },
    data: () => ({
      certificates: [],
    }),
    methods: {
      ...mapActions('provider', ['createCertificates', 'profileRequest']),
      sendRequest() {
        const _this = this;
        return this.createCertificates(this.getCheckedCertificates())
          .then(({ data }) => {
            _this.certificates = [];
            _this.initCertificates(data);

            _this.afterSubmit()
          })
          .catch(error => {
            // todo: process 422 errors correct way(no images)
            Object.entries(error?.response?.data?.errors || {}).forEach(item => {
              this.toast(item?.[1]?.[0].replace('certificates.0.', ''))
            })

            return Promise.reject(error)
          })
      },
      getCheckedCertificates() {
        let form = new FormData()
        this.checkedCertificates.forEach((certificate, index) => {
          if (certificate.id) {
            form.append(`certificates[${index}][id]`, certificate.id)
          }

          form.append(
            `certificates[${index}][team_members_count]`,
            certificate.team_members_count
          )
          form.append(`certificates[${index}][name]`, certificate.name)
          certificate.images.map(image => {
            form.append(`certificates[${index}][images][]`, image.file || image.id)
          })
        })
        return form
      },
      initCertificates(userCertificates) {
        CERTIFICATES.forEach(certificate => {
          let newCertificate;
          let userCert = userCertificates?.find(item => item.name === certificate)
          if (userCert) {
            newCertificate = this.userCertificate(userCert)
          } else {
            newCertificate = this.emptyCertificate(certificate);
          }

          this.certificates.push(newCertificate)
        })

        const customUserCerts = userCertificates?.filter(userCert => !CERTIFICATES.find(cert => cert === userCert.name));
        customUserCerts?.forEach(userCert => {
          this.certificates.push(this.userCertificate(userCert, true))
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
      userCertificate(userCert, isCustom = false) {
        return {
          id: userCert.id,
          name: userCert.name,
          checked: true,
          team_members_count: userCert.team_members_count,
          images: userCert.images?.data || [],
          isCustom: isCustom,
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
      ...mapGetters('auth', ['user', 'userProviderProfileId']),
      checkedCertificates() {
        return this.certificates.filter(certificate => certificate.checked)
      },
    },
    created() {
      // todo: optimize this
      if (this.userProviderProfileId) {
        const _this = this;

        this.profileRequest(this.userProviderProfileId).then(data => {
          _this.initCertificates(data?.certificates?.data || [])
        })
      } else {
        this.initCertificates()
      }
    },
  }
</script>

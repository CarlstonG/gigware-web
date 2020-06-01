<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6">
          <validated-b-form-group
              name="insurance_provider_name"
              label="Name of Insurance Provider"
              :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.insurance_provider_name"/>
          </validated-b-form-group>
          <b-row>
            <b-col>
              <validated-b-form-group
                  name="start_date"
                  label="Policy Start Date"
                  :disabled="formLocked"
              >
                <v-date-picker
                    v-model.trim.lazy="form.start_date"
                    :input-props="{
                    placeholder: 'MM/DD/YYYY',
                    class: 'form-control',
                  }"
                />
              </validated-b-form-group>
            </b-col>
            <b-col lg="6">
              <validated-b-form-group
                  name="end_date"
                  label="Policy End Date"
                  :disabled="formLocked"
              >
                <v-date-picker
                    v-model.trim.lazy="form.end_date"
                    :input-props="{
                    placeholder: 'MM/DD/YYYY',
                    class: 'form-control',
                  }"
                />
              </validated-b-form-group>
            </b-col>
          </b-row>
          <validated-b-form-group
              name="image"
              label="Upload Insurance Certificate"
              :disabled="formLocked"
          >
            <image-upload
                v-model="form.image"
                :img-src="form.image ? form.image.url : ''"
                class="text-center rounded bg-light border position-relative"
            >
              <template #no-image="{ openFileDialog }">
                <div class="pt-5 pb-5">
                  <div class="mb-2">
                    <svg-icon name="upload_icon" width="30"/>
                  </div>
                  <div class="mb-3">Drag an Image to upload</div>
                  <b-button variant="primary" size="sm" @click="openFileDialog">
                    Choose an Image
                  </b-button>
                </div>
              </template>
              <template #image="{ imgSrc, openFileDialog }">
                <img
                    :src="imgSrc"
                    class="w-100 h-auto"
                    style="object-fit: contain; max-height: 200px"
                />
                <b-button
                    variant="primary"
                    size="sm"
                    @click="openFileDialog"
                    style="position: absolute; left: 0; bottom: -50px;"
                >
                  Choose an Image
                </b-button>
              </template>
              <template #image-uploaded="{ src, openFileDialog }">
                <img
                    :src="src"
                    class="w-100 h-auto"
                    style="object-fit: contain; max-height: 200px"
                />
                <b-button
                    variant="primary"
                    size="sm"
                    @click="openFileDialog"
                    style="position: absolute; left: 0; bottom: -50px;"
                >
                  Choose an Image
                </b-button>
              </template>
            </image-upload>
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer
          :loading="formLocked"
          :state="formState"
          :optional="true"
          @skip="goToNextStep"
      />
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import ImageUpload from '@/core/components/images/ImageUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { ImageUpload, StepsFooter },
    data: () => ({
      form: {
        insurance_provider_name: '',
        start_date: '',
        end_date: '',
        image: null,
      },
    }),
    validations: validations.onboarding.insurance,
    methods: {
      ...mapActions('provider', ['createInsurance', 'profileRequest']),
      sendRequest() {
        const _this = this;
        return this.createInsurance(this.formData())
          .then(({ data }) => {
            _this.form = Object.assign(_this.form, data)

            _this.afterSubmit()
          })
          .catch(error => {
            // todo: process 422 errors correct way(no images)
            Object.entries(error?.response?.data?.errors || {}).forEach(item => {
              this.toast(item?.[1]?.[0])
            })
          })
      },
      formData() {
        let formData = new FormData()

        formData.append('id', this.form.id || '')
        formData.append(
          'insurance_provider_name',
          this.form.insurance_provider_name,
        )

        formData.append('start_date', this.form.start_date.toISOString())
        formData.append('end_date', this.form.end_date.toISOString())
        if (this.form.image instanceof File) {
          formData.append('image', this.form.image)
        }

        return formData
      },
    },
    computed: {
      ...mapGetters('auth', ['user', 'userProviderProfileId']),
    },
    created() {
      // todo: optimize this
      if (this.userProviderProfileId) {
        const _this = this;

        this.profileRequest(this.userProviderProfileId).then(data => {
          const insurance = data?.insurance;
          if (!insurance) return;

          _this.form = {
            insurance_provider_name: insurance.insurance_provider_name,
            start_date: new Date(insurance.start_date),
            end_date: new Date(insurance.end_date),
            image: insurance.image || null,
          };
        })
      }
    },
  }
</script>

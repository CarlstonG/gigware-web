<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="pr-5">
          <validated-b-form-group
            name="first_name"
            label="First Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.first_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="last_name"
            label="Last Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.last_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="phone_number"
            label="Phone Number"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.phone_number" />
          </validated-b-form-group>
          <validated-b-form-group
            name="company_name"
            label="Company Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.company_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="team_size"
            label="Team Size"
            :disabled="formLocked"
            class="w-25"
          >
            <b-form-input v-model.trim.lazy="form.team_size" />
          </validated-b-form-group>
          <validated-b-form-group
            name="description"
            label="About Us"
            :disabled="formLocked"
          >
            <b-textarea v-model.trim.lazy="form.description" />
          </validated-b-form-group>
        </b-col>
        <b-col lg="6" class="pl-5">
          <validated-b-form-group
            name="profile_image"
            label="Upload Profile Image"
            :disabled="formLocked"
          >
            <image-upload
              v-model="form.profile_image"
              class="text-center rounded bg-light border position-relative"
            >
              <template #no-image="{ openFileDialog }">
                <div class="pt-5 pb-5">
                  <div class="mb-2"><svg-icon name="caret" width="30" /></div>
                  <div class="mb-3">Drag an Image to upload</div>
                  <b-button variant="primary" size="sm" @click="openFileDialog">
                    Choose an Image
                  </b-button>
                </div>
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
                  style="position: absolute; left: 0; bottom: -70px;"
                >
                  Choose an Image
                </b-button>
              </template>
            </image-upload>
            <div class="mt-2 mb-2">
              <strong>Tip:</strong>
              Customers prefer clear photos with a smiling face.
            </div>
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer @next="submit" :loading="formLocked" :state="formState" />
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import ImageUpload from '@/core/components/images/ImageUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions } from 'vuex'

  export default {
    mixins: [validateFormMixin],
    components: { ImageUpload, StepsFooter },
    data: () => ({
      form: {
        first_name: '',
        last_name: '',
        phone_number: '',
        company_name: '',
        team_size: 0,
        description: '',
        profile_image: null,
      },
    }),
    validations: validations.onboarding.basicInformation,
    methods: {
      ...mapActions('provider', ['createBasicInformation']),
      sendRequest() {
        this.createBasicInformation(this.formData())
          .then(() => {
            this.$router.push({
              name: 'provider.onboarding.rates-and-location',
            })
          })
          .catch(error => {
            this.handleServerError(error)
          })
          .finally(() => {
            this.setDefaultState()
          })
      },
      formData() {
        let formData = new FormData()
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('company_name', this.form.company_name)
        formData.append('phone_number', this.form.phone_number)
        formData.append('team_size', this.form.team_size)
        formData.append('description', this.form.description)
        formData.append('profile_image', this.form.profile_image)

        return formData
      },
    },
  }
</script>

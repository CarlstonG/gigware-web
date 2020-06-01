<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6">
          <validated-b-form-group
              name="first_name"
              label="First Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.first_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="last_name"
              label="Last Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.last_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="phone_number"
              label="Phone Number"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.phone_number"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="company_name"
              label="Company Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.company_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="zip_code"
              label="Zip code"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.zip_code"/>
          </validated-b-form-group>
        </b-col>
        <b-col lg="5" offset-lg="1" sm="6" offset-sm="3">
          <!--      todo: fix image cropping -->
          <validated-b-form-group
              name="profile_image"
              label="Upload Profile Image"
              :disabled="formLocked"
              class=""
          >
            <image-upload
                v-model="form.profile_image"
                :img-src="userAvatarUrl"
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
                <div @click="openFileDialog">
                  <img :src="imgSrc" class="img-fluid img-thumbnail" alt="" style="max-width: 100px"/>
                </div>
                <b-button variant="primary" size="sm" @click="openFileDialog">
                  Choose an Image
                </b-button>
              </template>
              <template #image-uploaded="{ src, openFileDialog }">
                <vue-cropper
                    ref="cropper"
                    :src="src"
                    :img-style="{ 'obect-fit': 'contain', 'max-height': '200px' }"
                    :modal="false"
                    :guides="false"
                    :background="false"
                    :aspect-ratio="1"
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
          </validated-b-form-group>
        </b-col>
      </b-row>
      <div class="mt-5 d-flex justify-content-end">
        <b-progress-button
            size="lg"
            :disabled="formLocked"
            :state="formState"
            default-text="Save"
            loading-text="Loading..."
        />
      </div>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions, mapGetters } from 'vuex'
  import ImageUpload from "../../../../core/components/images/ImageUpload";

  export default {
    components: { ImageUpload },
    mixins: [validateFormMixin],
    data: () => ({
      form: {
        first_name: '',
        last_name: '',
        phone_number: '',
        company_name: '',
        zip_code: '',
        profile_image: null,
      },
    }),
    validations: validations.settings,
    methods: {
      ...mapActions('customer', ['updateCustomerSettings']),
      sendRequest() {
        return this.updateCustomerSettings(this.formData())
          .then(() => {
            this.$root.$bvToast.toast('Your changes have been saved.', {
              toaster: 'b-toaster-top-right',
              variant: 'primary',
            })
          })
      },
      formData() {
        let formData = new FormData()
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('company_name', this.form.company_name)
        formData.append('zip_code', this.form.zip_code)
        formData.append('phone_number', this.form.phone_number)

        if (this.form.profile_image instanceof File) {
          formData.append('profile_image', this.form.profile_image)
        }

        return formData
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'userAvatarUrl']),
    },
    created() {
      if (this.user?.profile) {
        const user = this.user;
        const profile = user.profile;

        this.form = Object.assign(this.form, {
          first_name: user.first_name || profile.first_name,
          last_name: user.last_name || profile.last_name,
          phone_number: profile.phone_number,
          company_name: profile.company_name,
          zip_code: profile.zip_code,
          profile_image: this.userAvatarUrl,
        });
      }
    }
  }
</script>

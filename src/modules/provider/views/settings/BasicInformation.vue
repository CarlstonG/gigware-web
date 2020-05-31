<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="pr-5">
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
              name="team_size"
              label="Team Size"
              :disabled="formLocked"
              class="w-25 required"
          >
            <b-form-input v-model.trim.lazy="form.team_size"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="description"
              label="About Us"
              :disabled="formLocked"
              class="required"
          >
            <b-form-textarea v-model.trim.lazy="form.description" rows="5"/>
          </validated-b-form-group>
        </b-col>
        <b-col lg="6" class="pl-5">
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
            <div class="mt-2 mb-2">
              <strong>Tip:</strong>
              Customers prefer clear photos with a smiling face.
            </div>
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer @next="submit" :loading="formLocked" :state="formState"/>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import ImageUpload from '@/core/components/images/ImageUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'

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
        const _this = this;

        return this.createBasicInformation(this.formData())
          .then((data) => {
            // update data
            if (_this.user?.provider_profile) {
              const user = _this.user;

              user.first_name = data.first_name;
              user.last_name = data.last_name;
              user.images = data.images;
              _this.user.provider_profile = Object.assign(user.provider_profile, data.provider_profile);
            }

            this.$router.push({
              name: 'provider.onboarding.rates-and-location',
            })
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
      if (this.user?.provider_profile) {
        const user = this.user;
        const profile = user.provider_profile;

        this.form = Object.assign(this.form, {
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: profile.phone,
          company_name: profile.company_name,
          team_size: profile.team_size,
          description: profile.description,
          profile_image: this.userAvatarUrl,
        });
      }
    }
  }
</script>

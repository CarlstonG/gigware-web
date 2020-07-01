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
            <b-form-input v-model.trim.lazy="form.first_name"
                          :placeholder="placeholders.first_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="last_name"
              label="Last Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.last_name"
                          :placeholder="placeholders.last_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="phone_number"
              label="Phone Number"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.phone_number"
                          :placeholder="placeholders.phone_number"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="company_name"
              label="Company Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.company_name"
                          :placeholder="placeholders.company_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="zip_code"
              label="Zip code"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.zip_code"
                          :placeholder="placeholders.zip_code"/>
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
            <file-upload
                v-model="form.profile_image"
                ref="fileUpload"
                :file-src="avatarUrl"
                :cropperImageStyle="{ 'object-fit': 'contain', 'max-height': '30vh' }"
                :cropperAspectRatio="1"
                :tips="{
                  'no-image': 'Customers prefer clear photos with a smiling face',
                  'uploaded': 'Drag the frame to adjust image'
                }"
            />
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
<style scoped lang="scss" src="./Settings.scss"></style>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import { mapActions, mapGetters } from 'vuex'
  import FileUpload from "@/core/components/file/FileUpload";
  import { avatarCroppedBlobOptions } from "@/core/constants/cropped-blob-options";

  export default {
    components: { FileUpload },
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
      placeholders: placeholders,
    }),
    validations: validations.settings,
    methods: {
      ...mapActions('customer', ['updateCustomerSettings']),
      async sendRequest() {
        return this.updateCustomerSettings(await this.formData())
          .then(() => {
            this.$refs.fileUpload?.resetUploadedFile();
            this.$root.$bvToast.toast('Your changes have been saved.', {
              toaster: 'b-toaster-top-right',
              variant: 'primary',
            })
          })
      },
      async formData() {
        let formData = new FormData()
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('company_name', this.form.company_name)
        formData.append('zip_code', this.form.zip_code)
        formData.append('phone_number', this.form.phone_number)

        const blob = await this.$refs.fileUpload?.getCroppedBlob(avatarCroppedBlobOptions);
        if (blob) {
          formData.append('profile_image', blob);
        }

        return formData
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'avatarUrl']),
    },
    created() {
      this.formState = 'loading';

      this.$auth.userFetched()
        .then(() => {
          if (this.user?.profile) {
            const user = this.user;
            const profile = user.profile;

            this.form = Object.assign(this.form, {
              first_name: user.first_name || profile.first_name,
              last_name: user.last_name || profile.last_name,
              phone_number: profile.phone_number,
              company_name: profile.company_name,
              zip_code: profile.zip_code,
              profile_image: this.avatarUrl,
            });
          }
        })
        .finally(() => this.formState = 'default')
    }
  }
</script>

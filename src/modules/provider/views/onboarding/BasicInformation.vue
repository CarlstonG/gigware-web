<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="col-left">
          <validated-b-form-group
              name="first_name"
              label="First Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.first_name"
                          :placeholder="placeholders.first_name"/>
            <verification-message :value="user.verification" name="first_name" alias="last_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="last_name"
              label="Last Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.last_name"
                          :placeholder="placeholders.last_name"/>
            <verification-message :value="user.verification" name="last_name" alias="first_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="phone_number"
              label="Phone Number"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.phone_number"
                          :placeholder="placeholders.phone_number"
                          v-on:keyup="formatPhoneNumber()"
                          maxlength="10"/>
          </validated-b-form-group>
          <!--set company name to not required -->
          <validated-b-form-group
              name="company_name"
              label="Company Name"
              :disabled="formLocked"
              class=" "
          >
            <b-form-input v-model.trim.lazy="form.company_name"
                          :placeholder="placeholders.company_name"/>
            <verification-message v-if="user.provider_profile"
                                  :value="user.provider_profile.verification"
                                  name="company_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="team_size"
              label="Team Size"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input class="w-25" v-model.trim.lazy="form.team_size"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="description"
              label="About You - show your customers you're a good fit by telling them about yourself"
              :disabled="formLocked"
              class="required"
          >
            <b-form-textarea v-model.trim.lazy="form.description" rows="5"
                             :placeholder="placeholders.about_us"/>
          </validated-b-form-group>
        </b-col>
        <b-col lg="6" class="col-right">
          <validated-b-form-group
              name="profile_image"
              label="Upload Profile Image"
              :disabled="formLocked"
              class=""
          >
            <file-upload v-model="form.profile_image"
                          ref="fileUpload"
                          :file-src="avatarUrl"
                          :cropperImageStyle="{ 'object-fit': 'contain', 'max-height': '30vh' }"
                          :cropperAspectRatio="1"
                          :tips="{
                            'no-image': 'Customers prefer clear photos with a smiling face',
                            'uploaded': 'Drag the frame to adjust image'
                          }"
            />
            <verification-message :value="avatarModel.verification"/>
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer :loading="formLocked" :state="formState"/>
    </b-form>
  </validated-b-form-wrapper>
</template>
<style scoped lang="scss" src="./BasicInformation.scss"></style>

<script>
  import validations from '@/modules/provider/services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import FileUpload from '@/core/components/file/FileUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'
  import VerificationMessage from "@/core/components/forms/VerificationMessage";
  import { avatarCroppedBlobOptions } from "@/core/constants/cropped-blob-options";

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { VerificationMessage, FileUpload, StepsFooter },
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
      placeholders: placeholders,
    }),
    validations: validations.onboarding.basicInformation,
    methods: {
      ...mapActions('provider', ['createBasicInformation']),
      async sendRequest() {
        return this.createBasicInformation(await this.formData())
          .then(() => {
            this.$refs.fileUpload?.resetUploadedFile();
            this.afterSubmit()
          })
      },
      async formData() {
        let formData = new FormData()
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('company_name', this.form.company_name)
        formData.append('phone_number', this.form.phone_number)
        formData.append('team_size', this.form.team_size)
        formData.append('description', this.form.description)

        const blob = await this.$refs.fileUpload?.getCroppedBlob(avatarCroppedBlobOptions);
        if (blob) {
          formData.append('profile_image', blob);
        }

        return formData
      },
      formatPhoneNumber() {
        let x = this.form.phone_number;
        return this.form.phone_number = x.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/,'($1)-$2-$3');
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'avatarUrl']),
      avatarModel() {
        return this.user.images?.data?.length ? this.user.images.data[this.user.images.data.length - 1] : { verification: {} }
      }
    },
    created() {
      this.formState = 'loading';

      this.$auth.userFetched()
        .then(() => {
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
              profile_image: this.avatarUrl,
            });
          }
        })
        .finally(() => this.formState = 'default')
    }
  }
</script>

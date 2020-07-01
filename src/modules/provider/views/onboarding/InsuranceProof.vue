<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row v-if="initialized">
        <b-col lg="6">
          <validated-b-form-group
              name="insurance_provider_name"
              label="Name of Insurance Provider"
              :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.insurance_provider_name"/>
            <verification-message :value="form.verification"/>
          </validated-b-form-group>
          <b-row>
            <b-col>
              <validated-b-form-group
                  name="start_date"
                  label="Policy Start Date"
                  :disabled="formLocked"
              >
                <utc-date-picker
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
                <utc-date-picker
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
            <file-upload
                v-model="form.image"
                ref="fileUpload"
                :img-src="form.image ? form.image.url : ''"
                :tips="{'uploaded': 'Drag the frame to adjust image'}"
            />
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer
          :loading="formLocked"
          :state="formState"
          @skip="goToNextStep"
      />
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import FileUpload from '@/core/components/file/FileUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'
  import VerificationMessage from "@/core/components/forms/VerificationMessage";
  import { documentCroppedBlobOptions } from "@/core/constants/cropped-blob-options";

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { VerificationMessage, FileUpload, StepsFooter },
    data: () => ({
      form: {
        insurance_provider_name: '',
        start_date: '',
        end_date: '',
        image: null,
        verification: {}
      },
      initialized: false,
    }),
    validations: validations.onboarding.insurance,
    methods: {
      ...mapActions('provider', ['createInsurance', 'profileRequest']),
      async sendRequest() {
        const _this = this;
        return this.createInsurance(await this.formData())
          .then(data => {
            _this.$refs.fileUpload?.resetUploadedFile();
            _this.newFormFromData(data);

            _this.afterSubmit()
          });
      },
      async formData() {
        let formData = new FormData()

        formData.append('id', this.form.id || 0)
        formData.append(
          'insurance_provider_name',
          this.form.insurance_provider_name,
        )

        if (this.form.start_date) formData.append('start_date', this.form.start_date.toISOString())
        if (this.form.end_date) formData.append('end_date', this.form.end_date?.toISOString())

        const blob = await this.$refs.fileUpload?.getCroppedBlob(documentCroppedBlobOptions);
        if (blob) {
          formData.append('image', blob);
        }

        return formData
      },
      newFormFromData(data) {
        this.form = {
          id: data.id,
          insurance_provider_name: data.insurance_provider_name,
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
          image: data.image || null,
          verification: data.verification
        };
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'providerProfileId']),
    },
    created() {
      // todo: optimize this
      if (this.providerProfileId) {
        this.formState = 'loading';

        this.profileRequest(this.providerProfileId)
          .then(data => {
            const insurance = data?.insurance;
            if (!insurance) return;

            this.newFormFromData(insurance);
          })
          .finally(() => {
            this.formState = 'default';
            this.initialized = true;
          })
      } else {
        this.initialized = true;
      }
    },
  }
</script>

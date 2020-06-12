<template>
  <validated-b-form-wrapper :validator="$v.forms">
    <b-form @submit.prevent="submit">
      <b-row class="mb-5" v-for="(form, index) in forms" :key="index">
        <b-col lg="6" class="col-left">
          <validated-b-form-group
              :name="`$each.${index}.job_location`"
              label="Job Location"
              :disabled="formLocked"
          >
            <b-form-input
                v-model.trim.lazy="form.job_location"
                placeholder="Utopia Highschool"
            />
          </validated-b-form-group>
          <validated-b-form-group
              :name="`$each.${index}.job_description`"
              label="Job Description"
              :disabled="formLocked"
          >
            <b-textarea
                v-model.trim.lazy="form.job_description"
                placeholder="The team completed 15 runs for a new computer facility on campus"
                rows="4"
            />
          </validated-b-form-group>
          <validated-b-form-group
              :name="`$each.${index}.employer_name`"
              label="Employer's Name"
              :disabled="formLocked"
          >
            <b-form-input
                v-model.trim.lazy="form.employer_name"
                placeholder="John Smith"
            />
          </validated-b-form-group>
          <validated-b-form-group
              :name="`$each.${index}.employer_title`"
              label="Employer's Title"
              :disabled="formLocked"
          >
            <b-form-input
                v-model.trim.lazy="form.employer_title"
                placeholder="Assistant Superintendent"
            />
          </validated-b-form-group>
          <validated-b-form-group
              :name="`$each.${index}.employer_phone`"
              label="Employer’s Phone Number"
              :disabled="formLocked"
          >
            <b-form-input
                v-model.trim.lazy="form.employer_phone"
                placeholder="xxx-xxx-xxxx"
            />
          </validated-b-form-group>
        </b-col>
        <b-col lg="6" class="col-right">
          <b-row>
            <b-col lg="6">
              <validated-b-form-group
                  :name="`$each.${index}.start_date`"
                  label="Start Date"
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
                  :name="`$each.${index}.end_date`"
                  label="End Date"
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
              :name="`$each.${index}.image`"
              label="Upload Images of Your Work"
              :disabled="formLocked"
          >

            <multiple-image-upload v-model="form.images" class="images-uploader">
              <template #no-image="{ openFileDialog }">
                <div class="upload-btn-wrapper">
                  <b-button
                      variant="primary"
                      @click="openFileDialog">
                    <svg-icon name="upload_icon" :width="$screens({default: '16', lg: '21'})"/>
                    Choose an Image
                  </b-button>
                </div>
              </template>
              <template #image="{ removeImage, openFileDialog }">
                <div class="upload-btn-wrapper">
                  <b-button
                      variant="primary"
                      @click="openFileDialog">
                    <svg-icon name="caret" :width="$screens({default: '16', lg: '21'})"/>
                    Choose an Image
                  </b-button>
                </div>
                <div class="images-container">
                  <div
                      v-for="(image, index) in form.images"
                      :key="index"
                      class="image-wrapper"
                  >
                    <img :src="image.src || image.url"/>
                    <b-link class="remove-image" @click="removeImage(index)">
                      <svg-icon name="close_icon" width="100%"/>
                    </b-link>
                  </div>
                </div>
              </template>
              <template #image-uploaded="{ removeImage, openFileDialog }">
                <div class="upload-btn-wrapper">
                  <b-button
                      variant="primary"
                      @click="openFileDialog">
                    <svg-icon name="caret" :width="$screens({default: '16', lg: '21'})"/>
                    Choose an Image
                  </b-button>
                </div>
                <div class="images-container">
                  <div
                      v-for="(image, index) in form.images"
                      :key="index"
                      class="image-wrapper"
                  >
                    <img :src="image.src || image.url"/>
                    <b-link class="remove-image" @click="removeImage(index)">
                      <svg-icon name="close_icon" width="100%"/>
                    </b-link>
                  </div>
                </div>
              </template>
            </multiple-image-upload>
          </validated-b-form-group>
          <div style="margin-top: 60px">
            <b-link @click="addForm" v-show="forms.length == index + 1">
              + Add new job
            </b-link>
          </div>
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
  import MultipleImageUpload from '@/core/components/images/MultipleImageUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { MultipleImageUpload, StepsFooter },
    data: () => ({
      forms: [],
    }),
    validations: validations.onboarding.experience,
    methods: {
      ...mapActions('provider', ['createExperiences', 'profileRequest']),
      sendRequest() {
        const _this = this;
        return this.createExperiences(this.formData())
          .then(({ data }) => {
            _this.forms = [];
            _this.userExperiencesDataToForms(data);

            _this.afterSubmit()
          })
      },
      formData() {
        let formData = new FormData()
        this.forms.forEach((form, index) => {
          if (form.id) {
            formData.append(`experiences[${index}][id]`, form.id)
          }

          formData.append(
            `experiences[${index}][job_location]`,
            form.job_location,
          )
          formData.append(
            `experiences[${index}][job_description]`,
            form.job_description,
          )
          formData.append(
            `experiences[${index}][employer_name]`,
            form.employer_name,
          )
          formData.append(
            `experiences[${index}][employer_title]`,
            form.employer_title,
          )
          formData.append(
            `experiences[${index}][employer_phone]`,
            form.employer_phone,
          )
          formData.append(
            `experiences[${index}][start_date]`,
            form.start_date.toISOString(),
          )
          formData.append(
            `experiences[${index}][end_date]`,
            form.end_date.toISOString(),
          )
          form.images.map(image => {
            formData.append(`experiences[${index}][images][]`, image.file || image.id)
          })
        })

        return formData
      },
      addForm() {
        this.forms.push({
          job_location: '',
          job_description: '',
          employer_name: '',
          employer_title: '',
          employer_phone: '',
          start_date: null,
          end_date: null,
          images: [],
        })
      },
      userExperiencesDataToForms(data) {
        if (data?.length) {
          data.forEach(item => this.pushUserJobToForm(item))
        } else {
          this.addForm()
        }
      },
      pushUserJobToForm(userJob) {
        this.forms.push({
          id: userJob.id,
          job_location: userJob.job_location,
          job_description: userJob.job_description,
          employer_name: userJob.employer_name,
          employer_title: userJob.employer_title,
          employer_phone: userJob.employer_phone,
          start_date: new Date(userJob.start_date),
          end_date: new Date(userJob.end_date),
          images: userJob.images?.data || [],
        })
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'providerProfileId']),
    },
    created() {
      // todo: optimize this
      if (this.providerProfileId) {
        const _this = this;
        this.formState = 'loading';

        this.profileRequest(this.providerProfileId).then(data => {
          _this.userExperiencesDataToForms(data?.experiences?.data)
          _this.formState = 'default';
        })
      } else {
        this.addForm()
      }
    },
  }
</script>

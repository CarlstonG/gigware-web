<template>
  <validated-b-form-wrapper :validator="$v.forms">
    <b-form @submit.prevent="submit">
      <b-row class="mb-5" v-for="(form, index) in forms" :key="index">
        <b-col lg="6" class="pr-5">
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
        <b-col lg="6" class="pl-5">
          <b-row>
            <b-col lg="6">
              <validated-b-form-group
                :name="`$each.${index}.start_date`"
                label="Start Date"
                :disabled="formLocked"
              >
                <v-date-picker
                  v-model.trim.lazy="form.start_date"
                  :data="['YYYY-MM-DD']"
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
                  data="YYYY/MM/DD"
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
            label="Upload Profile Image"
            :disabled="formLocked"
          >
            <image-upload
              v-model="form.image"
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
                  style="position: absolute; left: 0; bottom: -50px;"
                >
                  Choose an Image
                </b-button>
              </template>
            </image-upload>
          </validated-b-form-group>
          <div style="margin-top: 60px">
            <b-link @click="addForm" v-show="forms.length == index + 1">
              + Add new job
            </b-link>
          </div>
        </b-col>
      </b-row>
      <steps-footer :loading="formLocked" :state="formState" />
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
      forms: [],
    }),
    validations: validations.onboarding.experience,
    methods: {
      ...mapActions('provider', ['createExperiences']),
      sendRequest() {
        this.createExperiences(this.formData())
          .then(() => {
            this.$router.push({
              name: 'provider.onboarding.proof-of-insurance',
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
        this.forms.forEach((form, index) => {
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
          formData.append(`experiences[${index}][start_date]`, form.start_date.toISOString())
          formData.append(`experiences[${index}][end_date]`, form.end_date.toISOString())
          formData.append(`experiences[${index}][image]`, form.image)
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
          image: null,
        })
      },
    },
    created() {
      this.addForm()
    },
  }
</script>

<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6">
          <validated-b-form-group
            name="job_title"
            label="Job Title"
            :disabled="formLocked"
            class="required"
          >
            <b-form-input
              v-model.trim.lazy="form.job_title"
              :placeholder="placeholders.job_title"
            />
          </validated-b-form-group>
          <validated-b-form-group
            name="job_location"
            label="Job Location"
            :disabled="formLocked"
            class="required"
          >
            <b-form-input
              v-model.trim.lazy="form.job_location"
              :placeholder="placeholders.job_location"
            />
          </validated-b-form-group>
          <validated-b-form-group
            name="start_date"
            label="Start Date"
            :disabled="formLocked"
            class="required"
          >
            <b-form-input
              v-model.trim.lazy="form.start_date"
              :placeholder="placeholders.start_date"
            />
          </validated-b-form-group>
          <validated-b-form-group
            name="profile_image"
            label="Document Upload"
            :disabled="formLocked"
            class=""
          >
            <file-upload
              v-model="form.profile_image"
              ref="fileUpload"
              :file-src="avatarUrl"
              :cropperImageStyle="{
                'object-fit': 'contain',
                'max-height': '30vh',
              }"
              :cropperAspectRatio="1"
            />
          </validated-b-form-group>
        </b-col>
        <b-col lg="5" offset-lg="1" sm="6" offset-sm="3">
          <validated-b-form-group
            name="budget"
            label="Budget per run?"
            :disabled="formLocked"
          >
            <b-input-group size="lg" prepend="$">
              <b-form-input
                v-model.trim.lazy="form.budget"
                :placeholder="placeholders.budget"
              />
            </b-input-group>
          </validated-b-form-group>
          <validated-b-form-group
            name="job_description"
            label="Job Description"
            :disabled="formLocked"
            class="required"
          >
            <b-form-textarea
              v-model.trim.lazy="form.job_description"
              :placeholder="placeholders.job_description"
              rows="3"
              max-rows="6"
            />
          </validated-b-form-group>
          <validated-b-form-group
            name="skills"
            label="Required Skills"
            :disabled="formLocked"
          >
            <b-form-input
              v-model.trim.lazy="form.skills"
              :placeholder="placeholders.skills"
            />
            <small>Separate skills with comma</small>
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
<style scoped lang="scss" src="./Jobs.scss"></style>

<script>
import validations from "../../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import placeholders from "@/core/constants/placeholders";
import { mapActions, mapGetters } from "vuex";
import FileUpload from "@/core/components/file/FileUpload";

export default {
  components: { FileUpload },
  mixins: [validateFormMixin],
  data: () => ({
    form: {
      job_title: "",
      job_location: "",
      start_date: "",
      budget: "",
      job_description: "",
      skills: "",
      profile_image: null,
    },
    placeholders: placeholders,
  }),
  validations: validations.settings,
  methods: {
    ...mapActions(["updateCustomerSettings"]),
    async sendRequest() {
      return this.updateCustomerSettings(await this.formData()).then(() => {
        this.$refs.fileUpload?.resetUploadedFile();
        this.$root.$bvToast.toast("Your changes have been saved.", {
          toaster: "b-toaster-top-right",
          variant: "primary",
        });
      });
    },
    async formData() {
      let formData = new FormData();
      return formData;
    },
  },
  computed: {
    ...mapGetters("auth", ["user", "avatarUrl"]),
  },
  created() {},
};
</script>

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
            <b-form-datepicker
              v-model="form.start_date"
              class="mb-2"
            ></b-form-datepicker>
          </validated-b-form-group>
          <validated-b-form-group
            name="document"
            label="Document Upload"
            :disabled="formLocked"
            class=""
          >
            <div class="doc-uploader pb-4">
              <div class="text-gray mt-3" style="font-size: 2em;">
                <b-icon icon="upload" aria-hidden="true"></b-icon>
              </div>
              <div class="text-gray mt-3">
                <label v-if="!this.form.hasFiles"
                  >Drag document to upload</label
                >
                <label v-if="this.form.hasFiles">Selected File(s):</label>
                <span
                  class="d-flex"
                  v-for="doc in this.form.document"
                  :key="doc.index"
                  >{{ doc.name }}</span
                >
              </div>
              <div class="mt-3">
                <b-button variant="primary" class="center" @click="selectFiles"
                  >Choose Document</b-button
                >
              </div>
              <b-form-file
                v-model="form.document"
                class="mt-3"
                plain
                multiple
                hidden
                @change="filesChange"
                id="select-files"
              ></b-form-file>
            </div>
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
            name="required_skills"
            label="Required Skills"
            :disabled="formLocked"
          >
            <b-form-input
              v-model.trim.lazy="form.required_skills"
              :placeholder="placeholders.required_skills"
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
          @click="save"
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
import axios from "axios";

export default {
  components: {},
  mixins: [validateFormMixin],
  data: () => ({
    form: {
      job_title: "",
      job_location: "",
      start_date: "",
      budget: "",
      job_description: "",
      required_skills: "",
      document: null,
      hasFiles: false,
      files: [],
    },
    placeholders: placeholders,
  }),
  validations: validations.settings,
  methods: {
    save() {
      let params = new FormData();
      params.append("job_title", this.form.job_title);
      params.append("job_location", this.form.job_location);
      params.append("start_date", this.form.start_date);
      params.append("budget", this.form.budget);
      params.append("job_description", this.form.job_description);
      params.append("required_skills", this.form.required_skills);
      for (let i = 0; i < this.form.files.length; i++) {
        params.append("documents[]", this.form.files[i]);
      }
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      console.log(params);

      axios.post("customer-job", params, config).then((response) => {
        this.$root.$bvToast.toast(response.data.message, {
          toaster: "b-toaster-top-right",
          variant: "success",
        });
        window.location = "/jobs/customer";
      });
    },
    selectFiles() {
      let elem = document.getElementById("select-files");
      elem.click();
    },
    filesChange(e) {
      let elem = document.getElementById("select-files");
      this.form.files = e.target.files;
      console.log(this.form.files);
      if (elem.files.length > 0) this.form.hasFiles = true;
    },
  },
  computed: {},
};
</script>

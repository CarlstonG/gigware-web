<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-col lg="12">
      <b-container class="job-header">
        <span class="title">
          Utopia Highschool
        </span>
        <span class="text-gray">/ Active / Posted 08.08.2020</span>
        <span>
          <div>Houston, TX 77057 <span class="text-gray">+130mi</span></div>
        </span>
        <b-row class="mt-3">
          <div class="job-details ml-3">
            <h5>28.03.2020</h5>
            <h6 class="text-gray">Start Date</h6>
          </div>
          <div class="job-rate ml-5">
            <h5>$100 - $150</h5>
            <h6 class="text-gray">Per Hour</h6>
          </div>
        </b-row>
      </b-container>
    </b-col>
    <b-container class="mt-3">
      <b-row class="ml-3">
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed
        </div>
      </b-row>
    </b-container>
    <b-container class="mt-3">
      <div class="col">Uploaded Documents</div>
      <div class="mt-3">
        <span class="btn btn-outline-primary ml-3">Skill 1</span>
        <span class="btn btn-outline-primary ml-3">Skill 2</span>
        <span class="btn btn-outline-primary ml-3">Skill 3</span>
        <span class="btn btn-outline-primary ml-3">Skill 4</span>
      </div>
    </b-container>
    <div class="job-footer">
      <b-container class="text-primary">
        <b-row>
          <b-col md="6">
            <div>
              2 responses
            </div>
          </b-col>
          <b-col md="6">
            <div class="float-right">
              <span class="text-gray mr-2">Inactive</span>
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
              <span class="text-black ml-2">Active</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </validated-b-form-wrapper>
</template>
<style scoped lang="scss" src="./Jobs.scss"></style>

<script>
import validations from "../../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import placeholders from "@/core/constants/placeholders";
import { mapActions, mapGetters } from "vuex";

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

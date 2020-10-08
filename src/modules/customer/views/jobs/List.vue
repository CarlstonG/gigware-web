<template>
  <div class="jobs job-list">
    <!-- first job item -->
    <div class="container-full bg-white border-0 mb-3 pb-3">
      <div class="pt-4">
        <b-row>
          <div class="col-md-8">
            <b-container class="job-header">
              <span class="title">
                Utopia Highschool
              </span>
              <span class="text-gray">/ Active / Posted 08.08.2020</span>
              <span>
                <div>
                  <img src="/location.png" />
                  Houston, TX 77057 <span class="text-gray">+130mi</span>
                </div>
              </span>
            </b-container>
          </div>
          <div class="col-md-4" style="padding-right: 30px;">
            <button class="btn btn-primary float-right">
              <b-icon icon="person-plus" aria-hidden="true"></b-icon> Invite
              Partner
            </button>
          </div>
        </b-row>
      </div>

      <b-container>
        <hr />
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

      <div class="mt-3">
        <b-row class="ml-3">
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed
          </div>
        </b-row>
      </div>

      <div class="mt-3">
        <div class="col">
          Uploaded Documents
          <div class="col row">
            <!-- first item -->
            <div class="upload-documents">
              <div>
                <img src="/document.png" alt="" />
              </div>
              <div>Lorem ipsum.pdf</div>
            </div>

            <!-- second item -->
            <div class="upload-documents">
              <div>
                <img src="/document.png" alt="" />
              </div>
              <div>Lorem ipsum.pdf</div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <span class="btn btn-outline-primary ml-3">Skill 1</span>
          <span class="btn btn-outline-primary ml-3">Skill 2</span>
          <span class="btn btn-outline-primary ml-3">Skill 3</span>
          <span class="btn btn-outline-primary ml-3">Skill 4</span>
        </div>
      </div>

      <div class="job-footer">
        <div class="text-primary">
          <b-row>
            <b-col md="6">
              <div>
                2 responses
              </div>
            </b-col>
            <b-col md="6">
              <div class="float-right pr-3">
                <span class="text-gray mr-2">Inactive</span>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider round"></span>
                </label>
                <span class="text-black ml-2">Active</span>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- responses -->
      <div class="row response">
        <div class="col">
          <!-- first response -->
          <div class="container-full response-item">
            <b-col lg="12" class="mt-3">
              <b-row>
                <div class="col-md-8">
                  <div class="float-left mr-2">
                    <span
                      class="b-avatar badge-secondary rounded-circle"
                      style="width: 4rem; height: 4rem;"
                      ><svg
                        viewBox="0 0 16 16"
                        width="1em"
                        height="1em"
                        focusable="false"
                        role="img"
                        alt="avatar"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="bi-person-fill b-icon bi"
                      >
                        <g>
                          <path
                            fill-rule="evenodd"
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          ></path>
                        </g></svg
                    ></span>
                  </div>
                  <b-container class="job-header">
                    <span class="title">
                      Utopia Highschool
                    </span>
                    <span class="text-gray">/ Active / Posted 08.08.2020</span>
                    <span>
                      <div>
                        <img src="/location.png" />
                        Houston, TX 77057 <span class="text-gray">+130mi</span>
                      </div>
                    </span>
                  </b-container>
                </div>
                <div class="col-md-4" style="padding-right: 30px;">
                  <div class="float-right">
                    <img src="/verification.png" alt="" />
                  </div>
                </div>
              </b-row>
            </b-col>
            <b-col lg="12" class="mt-3">
              <!-- response start -->
              <div>
                <hr />
                <b-row class="mt-3">
                  <div class="job-details ml-3">
                    <img src="/per-run.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray">Per Run</span>
                  </div>
                  <div class="job-rate ml-5">
                    <img src="/cabling-pros.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray">Cabling Pros</span>
                  </div>
                  <div class="job-rate ml-5">
                    <img src="/reviews.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray"
                      ><strong class="text-dark">4.75</strong>/5</span
                    >
                  </div>
                </b-row>
                <hr />
              </div>
              <b-row>
                <div class="col-md-10">
                  Hi, I’m available. Check out my profile and feel free to
                  contact me for further information.
                </div>
                <div class="col-md-2">
                  <span class="text-primary border-0 float-right">Reply</span>
                </div>
              </b-row>
            </b-col>
            <b-col lg="12" class="pb-3 pt-3">
              <div class="row">
                <div class="col-10">
                  <b-form-textarea class="rounded-0"> </b-form-textarea>
                </div>
                <div class="col-2">
                  <button class="btn btn-primary btn-sm">
                    Send <img src="/send.png" class="img-white" />
                  </button>
                  <div class="float-right pr-3">
                    <b-icon icon="x" aria-hidden="true" scale="1.5"></b-icon>
                  </div>
                </div>
              </div>
            </b-col>
          </div>

          <!-- second response -->
          <div class="container-full response-item">
            <b-col lg="12" class="mt-3">
              <b-row>
                <div class="col-md-8">
                  <div class="float-left mr-2">
                    <span
                      class="b-avatar badge-secondary rounded-circle"
                      style="width: 4rem; height: 4rem;"
                      ><svg
                        viewBox="0 0 16 16"
                        width="1em"
                        height="1em"
                        focusable="false"
                        role="img"
                        alt="avatar"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="bi-person-fill b-icon bi"
                      >
                        <g>
                          <path
                            fill-rule="evenodd"
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          ></path>
                        </g></svg
                    ></span>
                  </div>
                  <b-container class="job-header">
                    <span class="title">
                      Utopia Highschool
                    </span>
                    <span class="text-gray">/ Active / Posted 08.08.2020</span>
                    <span>
                      <div>
                        <img src="/location.png" />
                        Houston, TX 77057 <span class="text-gray">+130mi</span>
                      </div>
                    </span>
                  </b-container>
                </div>
                <div class="col-md-4" style="padding-right: 30px;">
                  <div class="float-right">
                    <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
                  </div>
                </div>
              </b-row>
            </b-col>
            <b-col lg="12" class="mt-3">
              <!-- response start -->
              <div>
                <hr />
                <b-row class="mt-3">
                  <div class="job-details ml-3">
                    <img src="/per-run.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray">Per Run</span>
                  </div>
                  <div class="job-rate ml-5">
                    <img src="/cabling-pros.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray">Cabling Pros</span>
                  </div>
                  <div class="job-rate ml-5">
                    <img src="/reviews.png" />
                    <strong>$150</strong>
                    <span class="ml-2 text-gray"
                      ><strong class="text-dark">4.75</strong>/5</span
                    >
                  </div>
                </b-row>
                <hr />
              </div>
              <b-row>
                <div class="col-md-10">
                  Hi, I’m not available during that period of time.
                </div>
                <div class="col-md-2">
                  <span class="text-primary border-0 float-right">Reply</span>
                </div>
              </b-row>
            </b-col>
          </div>
        </div>
      </div>
    </div>

    <!-- second job item -->
    <div class="container-full bg-white border-0 mb-3 pb-3">
      <div class="pt-4">
        <b-row>
          <div class="col-md-8">
            <b-container class="job-header">
              <span class="title">
                Utopia Highschool
              </span>
              <span class="text-gray">/ Active / Posted 08.08.2020</span>
              <span>
                <div>
                  <img src="/location.png" />
                  Houston, TX 77057 <span class="text-gray">+130mi</span>
                </div>
              </span>
            </b-container>
          </div>
          <div class="col-md-4" style="padding-right: 30px;">
            <button class="btn btn-primary float-right">
              <b-icon icon="person-plus" aria-hidden="true"></b-icon> Invite
              Partner
            </button>
          </div>
        </b-row>
      </div>

      <b-container>
        <hr />
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

      <div class="mt-3">
        <b-row class="ml-3">
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed
          </div>
        </b-row>
      </div>

      <div class="mt-3">
        <div class="col">
          Uploaded Documents
          <div class="col row">
            <!-- first item -->
            <div class="upload-documents">
              <div>
                <img src="/document.png" alt="" />
              </div>
              <div>Lorem ipsum.pdf</div>
            </div>

            <!-- second item -->
            <div class="upload-documents">
              <div>
                <img src="/document.png" alt="" />
              </div>
              <div>Lorem ipsum.pdf</div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <span class="btn btn-outline-primary ml-3">Skill 1</span>
          <span class="btn btn-outline-primary ml-3">Skill 2</span>
          <span class="btn btn-outline-primary ml-3">Skill 3</span>
          <span class="btn btn-outline-primary ml-3">Skill 4</span>
        </div>
      </div>

      <div class="job-footer">
        <div class="text-primary">
          <b-row>
            <b-col md="6">
              <div>
                2 responses
              </div>
            </b-col>
            <b-col md="6">
              <div class="float-right pr-3">
                <span class="text-gray mr-2">Inactive</span>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider round"></span>
                </label>
                <span class="text-black ml-2">Active</span>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <!-- end job item -->
  </div>
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

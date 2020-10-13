<template>
  <div class="jobs job-list">
    <!-- first job item -->

    <div class="container-full border-0 mb-3 pb-3">
      <template>
        <div class="bg-white mb-3" v-for="job in this.jobs" :key="job.id">
          <div class="pt-4">
            <b-row>
              <div class="col-md-8">
                <b-container class="job-header">
                  <span class="title">
                    {{ job.job_title }}
                  </span>
                  <span class="text-gray"
                    >/ {{ job.status == 1 ? "Active" : "Inactive" }} / Posted
                    {{ job.created_at }}</span
                  >
                  <span>
                    <div>
                      <img src="/location.png" />
                      {{ job.job_location }}
                      <span class="text-gray">+130mi</span>
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
            <b-row>
              <div class="job-details ml-3">
                <h5 class="mb-2 mt-0">{{ job.start_date }}</h5>
                <h6 class="text-gray">Start Date</h6>
              </div>
              <div class="job-rate ml-5">
                <h5 class="mb-2 mt-0">${{ job.budget }}</h5>
                <h6 class="text-gray">Per Hour</h6>
              </div>
            </b-row>
          </b-container>

          <div class="mt-3">
            <b-row class="ml-3">
              <div class="col pl-0 pr-5">
                {{ job.job_description }}
              </div>
            </b-row>
          </div>

          <!-- documents -->
          <div class="mt-3">
            <div class="col">
              Uploaded Documents
              <div class="col row">
                <!-- loop -->
                <div
                  class="upload-documents"
                  v-for="doc in job.documents"
                  :key="doc.id"
                >
                  <div>
                    <img src="/document.png" alt="" />
                  </div>
                  <div class="col pl-0 pr-5">{{ doc.document_name }}</div>
                </div>
                <!-- end loop -->
              </div>
            </div>
            <div class="mt-3">
              <span
                class="btn btn-outline-primary ml-3"
                v-for="skill in job.skills"
                :key="skill"
                >{{ skill }}</span
              >
            </div>
          </div>

          <div class="job-footer">
            <div class="text-primary">
              <b-row>
                <b-col md="6">
                  <div>{{ job.messages.length }} responses</div>
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
              <div class="col">
                <!-- first response -->
                <div
                  class="container-full response-item"
                  v-for="message in job.messages"
                  :key="message.id"
                >
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
                            {{
                              message.sender.customer_profile.first_name || ""
                            }}
                            {{
                              message.sender.customer_profile.last_name || ""
                            }}
                          </span>
                          <span class="text-gray"
                            >/ Active / Posted 08.08.2020</span
                          >
                          <span>
                            <div>
                              <img src="/location.png" />
                              Houston, TX 77057
                              <span class="text-gray">+130mi</span>
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
                      <div class="col-md-10 mb-3">
                        {{ message.message }}
                      </div>
                      <div class="col-md-2">
                        <span
                          class="text-primary border-0 float-right"
                          @click="reply(message.id)"
                          >Reply</span
                        >
                      </div>
                    </b-row>
                  </b-col>

                  <!-- input reply area -->
                  <b-col
                    lg="12"
                    class="pb-3"
                    :id="'reply-box-' + message.id"
                    v-show="false"
                  >
                    <div class="row">
                      <div class="col-10">
                        <b-form-textarea
                          class="rounded-0"
                          :id="'reply-' + message.id"
                        >
                        </b-form-textarea>
                      </div>
                      <div class="col-2">
                        <button
                          class="btn btn-primary btn-sm"
                          @click="sendMessage(message.id, job.id)"
                        >
                          Send <img src="/send.png" class="img-white" />
                        </button>
                        <div class="float-right pr-3">
                          <b-icon
                            icon="x"
                            aria-hidden="true"
                            scale="1.5"
                            @click="closeReply(message.id)"
                          ></b-icon>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </div>
              </div>
            </div>
          </div>

          <!-- end response -->
        </div>
      </template>
    </div>
    <!-- end job item -->
  </div>
</template>
<style scoped lang="scss" src="./Jobs.scss"></style>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      jobs: [],
      sample: ``,
    };
  },
  methods: {
    getJobs() {
      axios.get("customer-job").then((response) => {
        this.jobs = response.data;
      });
    },
    reply(id) {
      let elem = document.getElementById("reply-box-" + id);
      elem.style.display = "block";
    },
    closeReply(id) {
      let elem = document.getElementById("reply-box-" + id);
      elem.style.display = "none";
    },
    sendMessage(id, job_id) {
      let elem = document.getElementById("reply-" + id);
      let params = {
        job_id: job_id,
        message: elem.value,
      };

      axios.post("send-message", params).then(() => {
        this.getJobs();
        this.closeReply(id);
      });
    },
  },
  computed: {},
  created() {
    this.getJobs();
  },
};
</script>

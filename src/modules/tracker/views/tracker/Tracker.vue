<template>
  <b-container class="mt-5">
    <b-row class="mb-5">
      <b-col cols="12" md="8">
        <b-form-select
          @change="fetchStatisticsByProject"
          v-model="project"
          size="lg"
          :options="projects"
        ></b-form-select>
      </b-col>
      <b-col cols="6" md="4">
        <b-row>
          <h1>{{ time }}</h1>
          <h1>
            <b-icon
              icon="play"
              aria-hidden="true"
              variant="success"
              @click="startTime"
              v-if="timerStatus == 'start' ? false : true"
            ></b-icon>
            <b-icon
              icon="stop-fill"
              aria-hidden="true"
              @click="stopTime"
              v-if="timerStatus == 'start' ? true : false"
            ></b-icon>
            <b-icon
              icon="pause"
              aria-hidden="true"
              @click="pauseTime"
              v-if="timerStatus == 'start' ? true : false"
            ></b-icon>
          </h1>
          <b-button
            v-b-modal.modal-center
            variant="outline-primary"
            class="border-0"
            @click="breakTime"
          >Take a break</b-button>
        </b-row>
      </b-col>
    </b-row>
    <b-tabs content-class="mt-3" lazy>
      <b-tab title="My Statistics">
        <Statistics
          :statistics="statistics"
          :total_hours="total_hours"
          @dateChanged="setStatistic_date"
          @statChanged="fetchStatistics"
          :date="statistic_date"
        />
      </b-tab>
      <b-tab title="Team">
        <Team
          :teams="teams"
          @dateChanged="setTeam_date"
          :date="team_date"
          @inputChanged="setSearchTeam"
          :searchVal="search_val"
        />
      </b-tab>
      <b-tab title="Map">
        <b-col class="mb-5">
          <GmapMap
            :center="{lat:Number(selectedProject.lat)|| 0, lng:Number(selectedProject.lng) || 0}"
            :zoom="17"
            map-type-id="terrain"
            style="width: 100%; height: 90vh;"
          >
            <GmapMarker
              :key="selectedProject.id"
              :position="{lat: Number(selectedProject.lat), lng: Number(selectedProject.lng)}"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </b-col>
      </b-tab>
      <b-tab title="Create Project">
        <b-row class="mt-5">
          <b-col md="6">
            <validated-b-form-wrapper :validator="$v.form">
              <b-form @submit.prevent="submit">
                <validated-b-form-group
                  name="project_name"
                  label="Project Name"
                  :disabled="formLocked"
                >
                  <b-form-input v-model.trim.lazy="form.project_name" />
                </validated-b-form-group>
                <validated-b-form-group name="street" label="Street" :disabled="formLocked">
                  <b-form-input v-model.trim.lazy="form.street" />
                </validated-b-form-group>
                <validated-b-form-group name="city" label="City" :disabled="formLocked">
                  <b-form-input v-model.trim.lazy="form.city" />
                </validated-b-form-group>
                <validated-b-form-group name="province" label="Province" :disabled="formLocked">
                  <b-form-input v-model.trim.lazy="form.province" />
                </validated-b-form-group>
                <validated-b-form-group name="zip_code" label="Zip Code" :disabled="formLocked">
                  <b-form-input v-model.trim.lazy="form.zip_code" />
                </validated-b-form-group>
                <validated-b-form-group name="country" label="Country" :disabled="formLocked">
                  <b-form-select v-model.trim.lazy="form.country" :options="countries"></b-form-select>
                </validated-b-form-group>

                <b-form-row class="justify-content-end mt-5 mb-5">
                  <b-progress-button
                    size="lg"
                    :disabled="formLocked"
                    :state="formState"
                    default-text="Submit"
                  />
                </b-form-row>
              </b-form>
            </validated-b-form-wrapper>
          </b-col>
          <b-col md="6" class="mb-5">
            <map-area :projects="projects" />
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>

    <!-- break time modal -->
    <template>
      <b-modal ref="my-modal" id="modal-center" centered title>
        <b-container class="text-center">
          <h1>{{ time }}</h1>
          <h2 class="centered">Break time</h2>
        </b-container>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button block variant="primary" size="sm" class @click="endBreakTime">End Break</b-button>
          </div>
        </template>
      </b-modal>
    </template>
  </b-container>
</template>

<script>
import validations from "../../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import Statistics from "../../components/Statistics";
import Team from "../../components/Team";
import { mapActions } from "vuex";
import axios from "axios";
import moment from "moment";
// import Timer from "timer.js";

export default {
  components: { Statistics, Team },
  mixins: [validateFormMixin],
  data: () => ({
    form: {
      project_name: "",
      street: "",
      city: "",
      province: "",
      zip_code: "",
      country: null,
      lat: "",
      lng: "",
    },
    project: null,
    projects: [],
    countries: [],
    selectedProject: [],
    duration: "00:00:00",
    statistics: [],
    tracker: [],
    statistic_date: moment(new Date()).format("YYYY-MM-DD"),
    teams: [],
    team_date: moment(new Date()).format("YYYY-MM-DD"),
    timerStatus: "",
    interval: null,
    currentTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      0,
      0,
      0
    ),
    myCounter: 0,
    total_hours: "",
    search_val: "",
  }),
  validations: validations.createProject,
  methods: {
    ...mapActions("tracker", ["createProject", "fetchProjects"]),
    async sendRequest() {
      let address = {
        street: this.form.street,
        city: this.form.city,
        province: this.form.province,
        zip_code: this.form.zip_code,
        country_id: this.form.country,
      };
      let country = this.countries.find((c) => c.value == address.country_id);
      let formattedAddress = `${address.street}, ${address.city} ${address.zip_code}, ${address.province}, ${country.text}`;

      await axios
        .get(`/addresses/get-lat-long?formattedAddress=${formattedAddress}`)
        .then((response) => {
          if (
            Array.isArray(response.data.results) &&
            response.data.results.length > 0
          ) {
            let latLong = response.data.results[0];
            this.form.lat = latLong.geometry.lat;
            this.form.lng = latLong.geometry.lng;
          }
        });

      this.storeProject();
    },
    storeProject() {
      return this.createProject(this.form).then((data) => {
        this.$root.$bvToast.toast(data.message, {
          toaster: "b-toaster-top-right",
          variant: "success",
        });
        this.fetchProjectsData();
      });
    },
    fetchProjectsData() {
      return this.fetchProjects().then((data) => {
        this.projects = data.projects;
      });
    },
    fetchCountriesData() {
      this.countries = [{ value: 1, text: "Philippines" }];
    },
    fetchStatisticsByProject() {
      let params = {
        tracker_id: this.tracker.id,
        project_id: this.project,
        date: moment(this.statistic_date).format("YYYY-MM-DD"),
      };
      axios.get(`/statistics`, { params: params }).then((response) => {
        this.statistics = response.data.statistics;
        this.total_hours = response.data.total_hours ?? "00:00:00";
      });
    },
    fetchStatistics() {
      if (this.project) {
        this.fetchStatisticsByProject;
        return;
      }

      axios
        .get(`/my-statistics/${this.tracker.id}`, {
          params: {
            date: moment(this.statistic_date).format("YYYY-MM-DD"),
          },
        })
        .then((response) => {
          this.statistics = response.data.statistics;
          this.total_hours = response.data.total_hours ?? "00:00:00";
        });
    },
    fetchTeams() {
      axios.get(`/team-members`).then((response) => {
        this.teams = response.data.teams;
      });
    },
    startTime() {
      if (this.project == null) {
        this.toast("Select project.");
        return;
      }

      if (this.timerStatus == "") {
        // post time start to db
        let params = {
          project_id: this.project,
          tracker_id: this.tracker.id,
        };

        axios.post(`/statistics/time-in`, params).then(() => {
          this.fetchStatistics();
        });
      }

      this.timerStatus = "start";
    },
    pauseTime() {
      this.timerStatus = "pause";
    },
    stopTime() {
      this.timerStatus = "";

      // post time end to db
      let params = {
        project_id: this.project,
        tracker_id: this.tracker.id,
      };

      axios.post(`/statistics/time-out`, params).then(() => {
        this.fetchStatistics();
      });
    },
    breakTime() {
      this.timerStatus = "pause";
      console.log("breaktime");
    },
    endBreakTime() {
      console.log("end breaktime");
      this.$refs["my-modal"].hide();
    },
    updateCurrentTime() {
      if (this.timerStatus == "start") {
        // this.currentTime = Date.now();
        this.myCounter = this.myCounter + 1;
      }
    },
    setStatistic_date(value) {
      this.statistic_date = moment(value).format("YYYY-MM-DD");
    },
    setTeam_date(value) {
      this.team_date = moment(value).format("YYYY-MM-DD");
    },
    setSearchTeam(value) {
      this.search_val = value;
    },
    searchTeam() {},
  },
  created() {
    this.tracker = JSON.parse(localStorage.getItem("tracker"));
    this.fetchProjectsData();
    this.fetchCountriesData();
    this.fetchStatistics();
    this.fetchTeams();
  },
  watch: {
    project() {
      let project_id = this.project;
      axios.get(`/projects/${project_id}`).then((response) => {
        this.selectedProject = response.data;
      });
    },
    timerStatus() {},
    statistic_date() {
      this.fetchStatistics();
    },
    team_date() {
      console.log("test team");
    },
    search_val() {
      console.log("test team search");
    },
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
  },
  computed: {
    time: function () {
      return this.hours + ":" + this.minutes + ":" + this.seconds;
    },
    milliseconds: function () {
      return this.myCounter;
    },
    hours: function () {
      var milli = this.milliseconds;
      // Doing the math
      var hrs = Math.floor(milli / 3600);
      // Using getHours()
      // var hrs = new Date(this.currentTime).getHours();
      // if (hrs >= 13) {
      //   hrs = hrs - 12;
      // }
      // return hrs >= 10 ? hrs : "0" + hrs;
      return hrs;
    },
    minutes: function () {
      var milli = this.milliseconds;
      var min = Math.floor((milli / 60) % 60);
      return min >= 10 ? min : "0" + min;
    },
    seconds: function () {
      var milli = this.milliseconds;
      var sec = Math.ceil(milli % 60).toFixed(0);
      if (sec == 60) {
        sec = 0;
      }
      return sec >= 10 ? sec : "0" + sec;
    },
  },
};
</script>

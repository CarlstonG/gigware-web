<template>
  <b-container class="mt-5">
    <b-row class="mb-5">
      <b-col cols="12" md="8">
        <b-form-select v-model="project" size="lg" :options="projects"></b-form-select>
      </b-col>
      <b-col cols="6" md="4">
        <b-row>
          <h1>00:02:59</h1>
          <h1>
            <b-icon icon="play" aria-hidden="true" variant="success"></b-icon>
            <b-icon icon="pause" aria-hidden="true"></b-icon>
          </h1>
          <span class="mt-3">Take a break</span>
        </b-row>
      </b-col>
    </b-row>
    <b-tabs content-class="mt-3" lazy>
      <b-tab title="My Statistics"></b-tab>
      <b-tab title="Team"></b-tab>
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
  </b-container>
</template>

<script>
import validations from "../../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import { mapActions } from "vuex";
import axios from "axios";

export default {
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
    project: "",
    projects: [],
    countries: [],
    selectedProject: [],
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
  },
  created() {
    this.fetchProjectsData();
    this.fetchCountriesData();
  },
  watch: {
    project() {
      let project_id = this.project;
      axios.get(`/projects/${project_id}`).then((response) => {
        this.selectedProject = response.data;
      });
    },
  },
};
</script>

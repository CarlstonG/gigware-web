<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <GmapMap
          :center="{lat:this.lng, lng:this.lng}"
          :zoom="2"
          map-type-id="terrain"
          style="width: 100%; height: 90vh;"
        >
          <GmapMarker
            v-for="project in projects"
            :key="project.value"
            :position="{lat: Number(project.lat), lng: Number(project.lng)}"
            :clickable="true"
            :draggable="true"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    projects: Array,
  },
  data() {
    return {
      // projects: [],
      lat: 0,
      lng: 0,
    };
  },
  created() {
    // this.fetchProjectsData();
  },
  methods: {
    ...mapActions("tracker", ["fetchProjects"]),
    fetchProjectsData() {
      return this.fetchProjects().then((data) => {
        this.projects = data.projects;
        if (this.projects.length > 0) {
          this.lat = Number(this.projects[0].lat);
          this.lng = Number(this.projects[0].lng);
        }
      });
    },
  },
};
</script>

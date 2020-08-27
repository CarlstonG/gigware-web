<template>
  <div>
    <b-row>
      <b-col md="4">
        <b-form-datepicker v-model="team_date" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12 mt-3">
        <table class="table">
          <tbody>
            <tr>
              <th>Team Member</th>
              <th>Working Time</th>
              <th>Break Time</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>
                <b-input v-model="search"></b-input>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="team in teams" :key="team.id">
              <td>
                <b-icon icon="check-circle-fill" aria-hidden="true" variant="success" class="mr-2"></b-icon>
                {{ team.tracker == null ? '' : team.tracker.email}}
              </td>
              <td>{{ team.time_start }} - {{ team.time_end }}</td>
              <td>{{ team.breaktime_start }} - {{ team.breaktime_end }}</td>
              <td>{{ team.duration }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: {
    teams: Array,
    date: String,
    searchVal: String,
  },
  data() {
    return {
      team_date: moment(new Date()).format("YYYY-MM-DD"),
      search: "",
    };
  },
  watch: {
    team_date(value) {
      this.$emit("dateChanged", value.toString());
    },
    search(value) {
      this.$emit("inputChanged", value.toString());
    },
  },
  computed: {},
  filters: {
    time(value) {
      return moment(value).format("LTS") == "Invalid date"
        ? ""
        : moment(value).format("LTS");
    },
  },
};
</script>
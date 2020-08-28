<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-form-datepicker v-model="statistic_date" />
      </b-col>
      <b-col md="6">
        <div class="float-right">
          Total:
          <strong class="ml-3">{{ total_hours }}</strong>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12 mt-3">
        <table class="table">
          <tbody>
            <tr v-for="stat in statistics" :key="stat.id">
              <td>
                <b-icon icon="play" aria-hidden="true" variant="success" class="mr-2"></b-icon>
                {{ stat.project.project_name }}
              </td>
              <td>
                <span :id="'status-'+stat.id">
                  <span
                    :id="'edit-time-'+stat.id"
                    :tabindex="stat.id"
                  >{{ stat.time_start | time }} - {{ stat.time_end | time }}</span>
                  <b-popover :target="'edit-time-'+stat.id" triggers="focus" placement="bottom">
                    <b-container>
                      <b-col>
                        <label for="time_start">Time Start</label>
                        <b-form-timepicker
                          :name="'timepicker-'+stat.id"
                          :value="stat.time_start | time24"
                          show-seconds
                          @context="timeStartChange"
                        />
                      </b-col>
                      <b-col>
                        <label for="time_end">Time End</label>
                        <b-form-timepicker
                          :value="stat.time_end | time24"
                          show-seconds
                          @context="timeEndChange"
                        />
                      </b-col>
                      <b-row class="mt-4">
                        <b-col>
                          <b-button variant="primary" @click="save(stat)">Save</b-button>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-popover>
                </span>
                <b-popover
                  :target="'status-'+stat.id"
                  triggers="hover"
                  placement="bottom"
                  variant="warning"
                >{{ stat.status ? 'Approved' : 'Waiting for approval'}}</b-popover>
              </td>
              <td>{{ stat.duration }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";

export default {
  props: {
    statistics: Array,
    total_hours: String,
    date: String,
  },
  data() {
    return {
      statistic_date: moment(new Date()).format("YYYY-MM-DD"),
      edited_time_start: "",
      edited_time_end: "",
    };
  },
  watch: {
    statistic_date(value) {
      this.$emit("dateChanged", value.toString());
    },
  },
  methods: {
    save(stat) {
      var edited_time_start_date = stat.time_start.substring(0, 11);
      var edited_time_end_date =
        stat.time_end == null
          ? edited_time_start_date
          : stat.time_end.substring(0, 11);

      let params = {
        edited_time_start: edited_time_start_date + this.edited_time_start,
        edited_time_end: edited_time_end_date + this.edited_time_end,
      };

      if (this.edited_time_end != "") {
        axios.post(`/my-statistics/${stat.id}`, params).then(() => {
          this.$emit("statChanged");
        });
      }
    },
    timeStartChange(ctx) {
      this.edited_time_start = ctx.value;
    },
    timeEndChange(ctx) {
      this.edited_time_end = ctx.value;
    },
  },
  computed: {},
  filters: {
    time(value) {
      return moment(value).format("LTS") == "Invalid date"
        ? ""
        : moment(value).format("LTS");
    },
    time24(value) {
      return moment(value).format("HH:mm:ss") == "Invalid date"
        ? ""
        : moment(value).format("HH:mm:ss");
    },
  },
};
</script>
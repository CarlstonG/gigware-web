<template>
  <div
    class="container-full center"
    style="
      background-color: #edf2f7;
      margin-left: -36px;
      margin-right: -36px;
      margin-top: -36px;
      margin-bottom: -36px;
      padding-top: 80px;
    "
    v-if="!hasRow"
  >
    <p>You Have no posted Jobs yet! Click bellow to post your first job.</p>

    <b-link
      variant="primary"
      class="btn btn-primary mt-5"
      href="/jobs/customer/add"
    >
      <b-icon icon="plus"></b-icon> Add New Job</b-link
    >
  </div>
</template>
<style scoped lang="scss" src="./Jobs.scss"></style>

<script>
import axios from "axios";

export default {
  components: {},
  data: () => ({
    hasRow: false,
  }),
  methods: {
    getJobs() {
      axios.get("customer-job").then((response) => {
        this.jobs = response.data;
        if (this.jobs.length > 0) {
          this.hasRow = true;
          window.location.href = "/jobs/customer/list";
        }
      });
    },
  },
  computed: {},
  created() {
    this.getJobs();
  },
};
</script>

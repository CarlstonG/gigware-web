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
export default {
  components: {},
  data: () => ({}),
  methods: {},
  computed: {},
  created() {},
};
</script>

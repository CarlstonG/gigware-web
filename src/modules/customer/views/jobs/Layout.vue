<template>
  <div class="jobs">
    <b-container>
      <b-row>
        <b-col lg="10" offset-lg="1">
          <b-row v-if="showAddButton">
            <b-col>
              <b-link
                variant="primary"
                class="btn btn-primary mb-3 float-right"
                href="/jobs/customer/add"
              >
                <b-icon icon="plus"></b-icon> Add New Job</b-link
              >
            </b-col>
          </b-row>
          <b-card no-body class="border-0">
            <b-card-header class="pt-4 pb-4 pl-5 pr-5" v-if="displayHeader">
              <div class="card-header-title">{{ title }}</div>
              <div class="card-header-subtitle">{{ subtitle }}</div>
            </b-card-header>
            <b-card-body>
              <router-view />
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <site-footer />
  </div>
</template>
<style scoped lang="scss" src="./Layout.scss"></style>

<script>
import { default as SiteFooter } from "@/core/components/global/Footer";

export default {
  components: { SiteFooter },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    subtitle() {
      return this.$route.meta.subtitle;
    },
    displayHeader() {
      return this.$route.meta.displayHeader;
    },
    showAddButton() {
      return this.$route.meta.showAddButton;
    },
  },
};
</script>

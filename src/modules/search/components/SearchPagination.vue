<template>
  <div class="search-pagination" v-if="searchPagination">
    <span class="text">Page</span>
    <div class="page-index">
      <b-spinner small type="grow" v-if="isLoading"></b-spinner>
      <strong v-else>{{searchPagination.current_page}}</strong>
    </div>

    <span class="text">of</span>
    <strong>{{searchPagination.total_pages}}</strong>

    <b-button variant="transparent"
              class="search-pagination-navigation"
              @click="fetchPartnersSearchPrevPageRequest"
              :disabled="isLoading || searchPagination.current_page === 1">
      <svg-icon name="arrow_prev" width="16"/>
    </b-button>
    <b-button variant="transparent"
              class="search-pagination-navigation"
              @click="fetchPartnersSearchNextPageRequest"
              :disabled="isLoading || searchPagination.current_page === searchPagination.total_pages">
      <svg-icon name="arrow_next" width="16"/>
    </b-button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "SearchPagination",
    computed: {
      ...mapGetters('search', ['isLoading', 'searchPagination']),
    },
    methods: {
      ...mapActions('search', ['fetchPartnersSearchPrevPageRequest', 'fetchPartnersSearchNextPageRequest']),
    }
  }
</script>

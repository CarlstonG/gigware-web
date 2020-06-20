<template>
  <div class="partners-search">
    <b-container fluid="" class="search">
      <search-bar/>
    </b-container>
    <b-container id="search-result" fluid="lg" class="page content">
      <div class="search-info">
        <div class="search-result-info" v-if="lastSearchQueryText || queryFiltersCount">Results for <span
            class="search-text">{{lastSearchQueryText}}</span></div>
        <search-filter-tags/>
        <search-pagination/>
      </div>

      <b-row class="cards" v-if="search_result && search_result.length">
        <b-col cols="12" lg="6" v-for="item in search_result" :key="item.id">
          <provider-card :value="item" :to="{ name: 'provider.profile', params: { id: item.id } }"></provider-card>
        </b-col>
      </b-row>

      <div class="next-page-btn-wrapper"
           v-if="!search_result || isLoading || (searchPagination && searchPagination.total_pages > 1)">
        <b-button variant="primary"
                  :disabled="isLoading || (searchPagination && searchPagination.total_pages === searchPagination.current_page)"
                  @click="nextPage">
          <template v-if="isLoading">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </template>
          <template v-else>
            Next Page
            <svg-icon name="next_page" width="12"/>
          </template>
        </b-button>
      </div>
    </b-container>
    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { mapActions, mapGetters, mapState } from "vuex";
  import geoLocationMixin from "@/core/mixins/geo-location";
  import SearchBar from "../components/SearchBar";
  import SearchFilterTags from "../components/SearchFilterTags";
  import ProviderCard from "../components/ProviderCard";
  import SearchPagination from "../components/SearchPagination";

  export default {
    mixins: [geoLocationMixin],
    components: { SearchPagination, ProviderCard, SearchBar, SearchFilterTags, SiteFooter },
    methods: {
      ...mapActions('search', ['fetchPartnersSearchRequest', 'fetchPartnersSearchNextPageRequest', 'clearSearchQueryFilters']),
      nextPage() {
        this.fetchPartnersSearchNextPageRequest().then(() => {
          document.getElementById('search-result').scrollIntoView();
        })
      }
    },
    computed: {
      ...mapState('search', ['search_result']),
      ...mapGetters('search', ['queryFiltersCount', 'isLoading', 'lastSearchQuery', 'lastSearchQueryText', 'searchPagination']),
    },
    mounted() {
      if (!this.isLoading && !this.search_result?.length) {
        this.fetchPartnersSearchRequest();
      }
    }
  }
</script>


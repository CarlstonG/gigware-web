<template>
  <div class="partners-search">
    <b-container fluid="" class="search">
      <search-bar v-model="searchQuery"
                  :left-filter-count="queryFiltersCount"
                  :left-filter-options="searchLeftFiltersOptions"
                  :inner-filter-options="searchInnerFiltersOptions"/>
    </b-container>
    <b-container id="search-result" fluid="lg" class="content">
      <div class="search-info">
        <div class="search-result-info" v-if="lastSearchQueryText || queryFiltersCount">Results for <span
            class="search-text">{{lastSearchQueryText}}</span></div>
        <search-filter-tags :options="searchLeftFiltersOptions"/>
        <search-pagination/>
      </div>

      <b-row class="cards" v-if="search_result && search_result.length">
        <b-col cols="12" lg="6" v-for="item in search_result" :key="item.id">
          <provider-card :value="item"></provider-card>
        </b-col>
      </b-row>

      <div class="next-page-btn-wrapper"
           v-if="!search_result || isLoading || (searchPagination && searchPagination.total_pages > 1)">
        <b-button variant="primary"
                  :disabled="isLoading || (searchPagination && searchPagination.total_pages == searchPagination.current_page)"
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
  import 'hooper/dist/hooper.css';
  import geoLocationMixin from "@/core/mixins/geo-location";
  import SearchBar from "../components/SearchBar";
  import SearchFilterTags from "../components/SearchFilterTags";
  import ProviderCard from "../components/ProviderCard";
  import SearchPagination from "../components/SearchPagination";

  export default {
    mixins: [geoLocationMixin],
    components: { SearchPagination, ProviderCard, SearchBar, SearchFilterTags, SiteFooter },
    data: () => ({
      searchLeftFiltersOptions: [
        {
          title: 'Team size',
          name: 'team_size',
          options: [
            { option: '0-5', value: '0-5' },
            { option: '5-10', value: '5-10' },
            { option: '10-20', value: '10-20' },
            { option: '20+', value: '20+' },
          ]
        },
        {
          title: 'Rates',
          name: 'rates',
          options: [
            { option: '< 50$', value: '-50' },
            { option: '$50 - $100', value: '50-100' },
            { option: '$100 - $150', value: '100-150' },
            { option: '$150+', value: '150+' },
          ]
        },
        {
          title: 'Availability',
          name: 'availability',
          options: [
            { option: 'Available Now', value: 'now' },
            { option: 'Available this month', value: 'month' },
          ]
        },
      ],
      searchInnerFiltersOptions: [
        { option: "Everywhere", value: "all" },
        { option: "Company", value: "company_name" },
        { option: "Zip Code", value: "address" }
      ]
    }),
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
      ...mapGetters('search', ['queryFiltersCount', 'isLoading', 'searchQuery', 'lastSearchQuery', 'lastSearchQueryText', 'searchPagination']),
    },
    created() {
      if (!this.search_result?.length) {
        this.fetchPartnersSearchRequest();
      }
    }
  }
</script>


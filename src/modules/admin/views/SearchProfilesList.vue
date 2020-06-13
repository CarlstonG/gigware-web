<template>
  <div class="partners-search">
    <b-container fluid="" class="search">
      <search-bar :namespace="searchNamespace">
        <template v-slot:left-filter>
          <div class="members-counter" v-if="searchPagination">
            <div class="title">{{searchPagination.total}}</div>
            <div class="label">members</div>
          </div>
        </template>
        <template v-slot:inner-filter/>
        <template v-slot:info-msg>
          <div class="info-msg">
            <span class="caution-icon">!</span>
            2 teams pending verification
          </div>
        </template>
      </search-bar>
    </b-container>
    <b-container id="search-result" fluid="lg" class="content">
      <div class="search-info">
        <div class="search-result-info" v-if="lastSearchQueryText || queryFiltersCount">Results for <span
            class="search-text">{{lastSearchQueryText}}</span></div>
        <search-filter-tags :namespace="searchNamespace"/>
        <search-pagination :namespace="searchNamespace"/>
      </div>

      <b-row class="cards" v-if="result && result.length">
        <b-col cols="12" lg="6" v-for="item in result" :key="item.id">
          <profile-card :value="item"/>
        </b-col>
      </b-row>

      <div class="next-page-btn-wrapper"
           v-if="!result || isLoading || (searchPagination && searchPagination.total_pages > 1)">
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
<style scoped lang="scss" src="./SearchProfileList.scss"></style>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { mapActions, mapGetters } from "vuex";
  import geoLocationMixin from "@/core/mixins/geo-location";
  import SearchBar from "@/modules/search/components/SearchBar";
  import SearchFilterTags from "@/modules/search/components/SearchFilterTags";
  import SearchPagination from "@/modules/search/components/SearchPagination";
  import ProfileCard from "../components/ProfileCard";

  export default {
    mixins: [geoLocationMixin],
    components: { ProfileCard, SearchPagination, SearchBar, SearchFilterTags, SiteFooter },
    data: () => ({
      searchNamespace: 'admin/searchVerifiableProfiles',
    }),
    methods: {
      ...mapActions('admin/searchVerifiableProfiles', ['fetchPartnersSearchRequest', 'fetchPartnersSearchNextPageRequest', 'clearSearchQueryFilters']),
      nextPage() {
        this.fetchPartnersSearchNextPageRequest().then(() => {
          document.getElementById('search-result').scrollIntoView();
        })
      }
    },
    computed: {
      ...mapGetters('admin/searchVerifiableProfiles', ['result', 'queryFiltersCount', 'isLoading', 'lastSearchQuery', 'lastSearchQueryText', 'searchPagination']),
    },
    mounted() {
      if (!this.isLoading && !this.result?.length) {
        this.fetchPartnersSearchRequest();
      }
    }
  }
</script>


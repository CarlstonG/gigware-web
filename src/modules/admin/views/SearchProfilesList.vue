<template>
  <div class="partners-search">
    <b-container fluid="" class="search">
      <search-bar namespace="admin/searchVerifiableProfiles">
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
        <search-filter-tags/>
        <search-pagination/>
      </div>

      <b-row class="cards" v-if="search_result && search_result.length">
        <b-col cols="12" lg="6" v-for="item in search_result" :key="item.id">
          <provider-card :value="item" :to="{ name: 'admin.verify-provider', params: { id: item.id } }">
            <template v-slot:append-profile-data>
              <span class="caution-icon">!</span>
            </template>
            <template v-slot:footer>
              <b-button variant="light">
                <div class="icon-card">
                  <svg-icon name="eye" class="icon-card-icon"/>
                  <span>View Profile</span>
                </div>
              </b-button>
            </template>
          </provider-card>
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
<style scoped lang="scss" src="./VerifiableProviderList.scss"></style>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { mapActions, mapGetters, mapState } from "vuex";
  import geoLocationMixin from "@/core/mixins/geo-location";
  import SearchBar from "@/modules/search/components/SearchBar";
  import SearchFilterTags from "@/modules/search/components/SearchFilterTags";
  import ProviderCard from "@/modules/search/components/ProviderCard";
  import SearchPagination from "@/modules/search/components/SearchPagination";

  export default {
    mixins: [geoLocationMixin],
    components: { SearchPagination, ProviderCard, SearchBar, SearchFilterTags, SiteFooter },
    methods: {
      ...mapActions('admin/searchVerifiableProfiles', ['fetchPartnersSearchRequest', 'fetchPartnersSearchNextPageRequest', 'clearSearchQueryFilters']),
      nextPage() {
        this.fetchPartnersSearchNextPageRequest().then(() => {
          document.getElementById('search-result').scrollIntoView();
        })
      }
    },
    computed: {
      ...mapState('admin/searchVerifiableProfiles', ['search_result']),
      ...mapGetters('admin/searchVerifiableProfiles', ['queryFiltersCount', 'isLoading', 'lastSearchQuery', 'lastSearchQueryText', 'searchPagination']),
    },
    mounted() {
      if (!this.isLoading && !this.search_result?.length) {
        this.fetchPartnersSearchRequest();
      }
    }
  }
</script>


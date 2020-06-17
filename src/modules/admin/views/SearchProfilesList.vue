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
            <template v-if="pendingQueueLoading">
              <b-spinner type="grow"/>
              <b-spinner type="grow"/>
              <b-spinner type="grow"/>
            </template>
            <template v-else-if="pendingVerificationProviderProfilesCount">
              <span class="caution-icon">!</span>
              {{ pendingVerificationProviderProfilesCount }}
              team{{pendingVerificationProviderProfilesCount > 1 ? 's' : '' }} pending verification
            </template>
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
          <profile-card :value="item" :has-caution="hasCaution(item)"/>
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
      ...mapActions('admin/pendingVerificationQueue', { 'fetchPendingQueue': 'fetch' }),
      nextPage() {
        this.fetchPartnersSearchNextPageRequest().then(() => {
          document.getElementById('search-result').scrollIntoView();
        })
      },
      hasCaution(item) {
        const queue = this.pendingQueueData;
        return (item.provider_profile && queue.some(el => el.verifiable_type === 'provider_profile' && el.verifiable_id === item.id))
          || (item.customer_profile && queue.some(el => el.verifiable_type === 'customer_profile' && el.verifiable_id === item.id));
      }
    },
    computed: {
      ...mapGetters('admin/searchVerifiableProfiles', { 'searchResult': 'result', 'searchLoading': 'isLoading' }),
      ...mapGetters('admin/searchVerifiableProfiles', ['queryFiltersCount', 'lastSearchQuery', 'lastSearchQueryText', 'searchPagination']),
      ...mapGetters('admin/pendingVerificationQueue', {
        'pendingQueueData': 'data',
        'pendingQueueLoading': 'isLoading'
      }),
      result() {
        return this.searchResult
      },
      isLoading() {
        return this.searchLoading;
      },
      pendingVerificationProviderProfilesCount() {
        return (this.pendingQueueData || []).filter(item => item.verifiable_type === 'provider_profile').length
      }
    },
    created() {
      this.$store.subscribeAction((action) => {
        if (action.type === 'admin/searchVerifiableProfiles/fetchPartnersSearchRequest' && !this.pendingQueueLoading) {
          this.fetchPendingQueue();
        }
      });

      if (!this.isLoading && !this.result?.length) {
        this.fetchPartnersSearchRequest();
      } else {
        // update on each page reload
        this.fetchPendingQueue();
      }
    }
  }
</script>


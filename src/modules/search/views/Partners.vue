<template>
  <div class="partners-search">
    <b-container fluid="" class="search">
      <search-bar v-model="searchQuery"
                  :left-filter-count="queryFiltersCount"
                  :left-filter-options="searchLeftFiltersOptions"
                  :inner-filter-options="searchInnerFiltersOptions"/>
    </b-container>
    <b-container fluid="" class="content">
      <div class="search-info">
        Results for <span class="search-text">{{searchQuery.search.text}}</span>
        <b-button variant="transparent" class="clear-filters" @click="clearSearchQueryFilters">delete filters</b-button>
      </div>

      <b-row class="cards">
        <b-col cols="12" lg="6" v-for="i in 20" :key="i">
          <provider-card v-model="testProviderCardData"></provider-card>
        </b-col>
      </b-row>
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
  import ProviderCard from "../components/ProviderCard";

  export default {
    mixins: [geoLocationMixin],
    components: { ProviderCard, SearchBar, SiteFooter },
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
      ],
      testProviderCardData: {
        "id": 1,
        "phone": "+12465071216",
        "company_name": "Gerhold-Hettinger",
        "team_size": 9,
        "rates_per_run": 250,
        "work_radius": 75,
        "description": "Corrupti quaerat amet vero laudantium laborum. Ut et consequatur ad quis ut. Recusandae hic qui veniam et aut iusto pariatur autem. Eum asperiores debitis in deleniti natus.",
        "address": {
          "id": 1,
          "street_address": "919 Elmer Forge Suite 405",
          "city": "Lake Ethylshire",
          "suite": null,
          "zip_code": "540859",
          "lat": "59.960357",
          "lng": "-71.987991"
        },
        "user": {
          "first_name": "Ardith",
          "last_name": "Dietrich",
          "images": {
            "data": [
              {
                "id": 1,
                "path": "providers",
                "name": "8rhbuZSiK1xujzinKvOTyZY5AwSOwURgWMDPOsHc",
                "filename": "8rhbuZSiK1xujzinKvOTyZY5AwSOwURgWMDPOsHc.jpeg",
                "full_path": "providers/8rhbuZSiK1xujzinKvOTyZY5AwSOwURgWMDPOsHc.jpeg",
                "url": "http://localhost/storage/images/providers/8rhbuZSiK1xujzinKvOTyZY5AwSOwURgWMDPOsHc.jpeg",
                "ext": "jpeg",
                "pos": 1
              }
            ]
          }
        }
      }
    }),
    methods: {
      ...mapActions('search', ['fetchPartnersSearchRequest', 'clearSearchQueryFilters']),
      fetch() {
        // todo: go search
      },
      nextPage() {
        // todo: next page
      },
    },
    computed: {
      ...mapState('search', ['search_result', 'search_query']),
      ...mapGetters('search', ['queryFiltersCount']),
      searchResult() {
        return this.search_result
      },
      searchQuery() {
        return this.search_query
      },
    },
    created() {
    },
  }
</script>


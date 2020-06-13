<template>
  <div class="search-filter-tags">
    <b-button class="search-filter-tags-tag" v-for="tag in tags" :key="tag.option" @click="removeTag(tag)">
      <div class="search-filter-tags-tag-wrapper">
        <span class="search-filter-tags-tag-label">{{tag.option}}</span>
        <svg-icon width="7" name="close_icon_black"/>
      </div>
    </b-button>
    <b-button variant="transparent" class="clear-filters" v-if="queryFiltersCount" @click="clearSearchQueryFilters">
      delete filters
    </b-button>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import leftFilterOptions from "../consts/left-filter-options"

  export default {
    name: "SearchFilterTags",
    props: {
      value: {
        type: Object,
        default: null
      },
      namespace: {
        type: String,
        default: 'search'
      },
      options: {
        type: Array,
        default: () => leftFilterOptions
      },
    },
    data() {
      return {
        tags: [] // {name:, option: , value:}
      }
    },
    computed: {
      ...mapState({
        searchQuery(state, getters) {
          return getters[this.namespace + '/searchQuery']
        },
        queryFiltersCount(state, getters) {
          return getters[this.namespace + '/queryFiltersCount']
        },
        queryFiltersChange(state, getters) {
          return getters[this.namespace + '/queryFiltersChange']
        },
      }),
    },
    methods: {
      ...mapActions({
        clearSearchQueryFilters(dispatch,) {
          return dispatch(this.namespace + '/clearSearchQueryFilters')
        },
        updateFilters(dispatch, payload) {
          return dispatch(this.namespace + '/updateSearchQueryFilters', payload)
        }
      }),
      updateTags(filter) {
        const _this = this;
        const tags = [];

        Object.entries(filter).forEach((v) => {
          const option = _this.options.find((item) => item.name === v[0])?.options?.find((item) => item.value === v[1])?.option
          if (option) {
            tags.push({ name: v[0], option: option, value: v[1] });
          }
        })

        this.tags = tags;
      },
      removeTag(tag) {
        this.searchQuery.filter[tag.name] = '';
      }
    },
    watch: {
      queryFiltersChange: function (v) {
        this.updateTags(v)
      }
    },
    created() {
      this.updateTags(this.searchQuery.filter)
    }
  }
</script>

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
  import { mapActions, mapGetters } from "vuex";
  import leftFilterOptions from "../consts/left-filter-options"

  export default {
    name: "SearchFilterTags",
    props: {
      value: {
        type: Object,
        default: null
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
      ...mapGetters('search', ['searchQuery', 'queryFiltersCount', 'queryFiltersChange']),
    },
    methods: {
      ...mapActions('search', ['updateSearchQueryFilters', 'clearSearchQueryFilters']),
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

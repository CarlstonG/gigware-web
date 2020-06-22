<template>
  <div class="search-wrapper">
    <slot name="left-filter">
      <b-dropdown left no-flip no-caret variant="outline-light" class="left-filter" v-if="!noLeftFilter">
        <template v-slot:button-content>
          <svg-icon name="search_filter" :width="$screens({ default: '16', md: '26' })"></svg-icon>
          <strong class="label d-none d-md-block">Filters</strong>
          <span class="chip" v-if="queryFiltersCount > 0">{{queryFiltersCount}}</span>
        </template>
        <template v-for="(item, i) in leftFilterOptions">
          <b-dropdown-form :key="i + 'dropdown'">
            <h4 class="header">{{item.title}}</h4>
            <b-form-radio v-for="option in item.options"
                          :key="option.value"
                          v-model="searchQuery.filter[item.name]"
                          :name="item.name"
                          :value="option.value">{{option.option}}
            </b-form-radio>
          </b-dropdown-form>
          <b-dropdown-divider v-if="i + 1 < leftFilterOptions.length" :key="i + 'divider'"/>
        </template>
      </b-dropdown>
    </slot>

    <div class="d-flex flex-column flex-grow-1">
      <b-input-group>
        <template v-slot:prepend v-if="innerOptions && innerOptions.length">
          <slot name="inner-filter">
            <b-dropdown no-caret variant="light" class="inner-filter">
              <template v-slot:button-content>
                <span class="select-text">{{innerFilterSelected.option}}</span>
                <svg-icon name="search_carret" :width="$screens({ default: '8', md: '10' })"></svg-icon>
              </template>
              <b-dropdown-item v-for="item in innerOptions" :key="item.value" @click="setInnerFilter(item)">
                {{item.option}}
              </b-dropdown-item>
            </b-dropdown>
          </slot>
        </template>

        <b-form-input id="search-input" class="search-input" type="search"
                      @keyup.enter.native="submit"
                      :placeholder="innerFilterSelected.placeholder"
                      v-model="searchQuery.search.text"/>

        <template v-slot:append>
          <b-button type="submit" variant="light" class="submit-sm d-md-none" :disabled="isLoading" @click="submit">
            <b-spinner small v-if="isLoading"></b-spinner>
            <svg-icon name="search" width="16" v-else></svg-icon>
          </b-button>

          <b-button type="submit" variant="primary" class="submit-md d-none d-md-block" :disabled="isLoading"
                    @click="submit">
            <b-spinner small type="grow" v-if="isLoading"></b-spinner>
            Search
          </b-button>
        </template>
      </b-input-group>

      <slot name="info-msg"></slot>
    </div>
  </div>
</template>

<script>
  import leftFilterOptions from "../consts/left-filter-options"
  import innerFilterOptions from "../consts/inner-filter-options"

  import { mapActions, mapState } from "vuex";

  export default {
    name: "SearchBar",
    emits: ['onSearch'], // means nothing, it's a developer suggestion
    props: {
      namespace: {
        type: String,
        default: 'search'
      },
      noLeftFilter: Boolean,
      // [{ title: '', name: '', options: [{option: name, value: val }]}]
      leftFilterOptions: {
        type: Array,
        default: () => leftFilterOptions
      },
      // [{ option: name, value: val, placeholder: text }]
      innerFilterOptions: {
        type: Array,
        default: () => innerFilterOptions
      }
    },
    data() {
      return {
        innerOptions: this.innerFilterOptions,
        leftOptions: this.leftFilterOptions,
      }
    },
    methods: {
      ...mapActions({
        searchRequest(dispatch,) {
          return dispatch(this.namespace + '/fetchPartnersSearchRequest')
        },
        updateFilters(dispatch, payload) {
          return dispatch(this.namespace + '/updateSearchQueryFilters', payload)
        }
      }),
      submit() {
        if (this.isLoading) return;

        this.$emit('onSearch')
        this.searchRequest();
      },
      setInnerFilter(item) {
        this.updateFilters({ ...this.searchQuery, search: { field: item.value } });
      },
      fireSearchEvent(e) {
        console.log('fireSearchEvent', e);
      }
    },
    computed: {
      ...mapState({
        isLoading(state, getters) {
          return getters[this.namespace + '/isLoading']
        },
        queryFiltersCount(state, getters) {
          return getters[this.namespace + '/queryFiltersCount']
        },
        searchQuery(state, getters) {
          return getters[this.namespace + '/searchQuery']
        }
      }),
      innerFilterSelected() {
        if (!this.innerOptions?.length) return null;
        if (!this.searchQuery?.search?.field) return this.innerOptions[0];
        return this.innerOptions.find(item => item.value === this.searchQuery.search.field) || null;
      }
    }
  }
</script>

<style scoped>

</style>

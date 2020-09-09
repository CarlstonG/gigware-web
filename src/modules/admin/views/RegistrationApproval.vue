<template>
  <div>
    <b-container fluid>
      <b-row class="mb-3">
        <b-col md="4" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="4" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="7" md="4" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
      >
        <template
          v-slot:cell(name)="row"
        >{{ row.item.customer_profile.first_name }} {{ row.item.customer_profile.last_name }}</template>
        <template v-slot:cell(registration_type)="row">{{ row.item.system_role }}</template>
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="approve(row.item.id)"
            class="btn-success"
            v-if="!row.item.is_verified"
          >Approve</b-button>
          <b-button
            size="sm"
            @click="reject(row.item.id)"
            class="btn-warning"
            v-if="row.item.is_verified"
          >Reject</b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </b-container>

    <site-footer />
  </div>
</template>

<script>
import SiteFooter from "@/core/components/global/Footer";
import axios from "axios";
export default {
  data: () => ({
    items: [],
    fields: [
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "registration_type", label: "Registration Type", sortable: true },
      { key: "meeting_date", label: "Meeting Date", sortable: true },
      {
        key: "is_verified",
        label: "Is Verified",
        sortable: true,
        formatter: (value) => {
          return value ? "Yes" : "No";
        },
      },
      { key: "actions", label: "Actions" },
    ],
    totalRows: 1,
    currentPage: 1,
    perPage: 10,
    pageOptions: [5, 10, 15],
    sortBy: "",
    sortDesc: false,
    sortDirection: "asc",
    filter: null,
    filterOn: [],
  }),
  components: { SiteFooter },
  computed: {},
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    approve(id) {
      console.log(id);
      axios.get("/admin/registration/approve/" + id).then((response) => {
        console.log(response);
      });
    },
    reject(id) {
      console.log(id);
      axios.get("/admin/registration/reject/" + id).then((response) => {
        console.log(response);
      });
    },
    getUsers() {
      axios.get("/admin/registration-approval").then((response) => {
        console.log(response.data);
        this.items = response.data.data;
        this.totalRows = response.data.total;
        this.perPage = response.data.per_page;
        this.currentPage = response.data.current_page;
      });
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {
    this.totalRows = this.items.length;
  },
};
</script>

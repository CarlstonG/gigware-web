<template>
  <div class="text-center my-3">
    <b-avatar id="popover-target-1" variant="primary" text="GW" class="ml-lg-4"></b-avatar>
    <b-popover target="popover-target-1" triggers="hover" placement="bottomleft">
      <b-col>
        <b-row>
          <b-media>
            <template v-slot:aside>
              <!-- <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img> -->
              <b-avatar variant="primary" text="GW"></b-avatar>
            </template>
            <b-row class="ml-lg-1">
              <span v-text="email"></span>
            </b-row>
            <b-row class="ml-lg-1">
              <span v-text="company"></span>
            </b-row>
          </b-media>
        </b-row>
      </b-col>
      <hr />
      <div
        style="margin:5px; padding:5px; width:250px; overflow:auto;"
        :style="!notifications.length ? 'height:50px;': 'height:300px;'"
      >
        <ul class="list-unstyled" v-if="notifications.length">
          <b-media tag="li" v-for="notification in notifications" :key="notification.id">
            <template v-slot:aside>
              <b-avatar variant="info" text="MD"></b-avatar>
            </template>
            <div>{{ notification.tracker.email }} {{ notification.action }}</div>
            <div>Date: {{ notification.date }}</div>
            <div>Initial: {{ notification.initial_time_start | time }} - {{ notification.initial_time_end | time }}</div>
            <div>Edited: {{ notification.edited_time_start | time }} - {{ notification.edited_time_end | time }}</div>
            <div class="row">
              <b-button
                variant="outline-primary"
                class="border-0"
                @click="approve(notification.id)"
              >Approve</b-button>
              <b-button
                variant="outline-danger"
                class="border-0"
                @click="decline(notification.id)"
              >Decline</b-button>
            </div>
          </b-media>
          <hr />
        </ul>
        <ul v-if="!notifications.length">No new notifications</ul>
      </div>
    </b-popover>
  </div>
</template>>

<script>
import axios from "axios";
import moment from "moment";

export default {
  props: {
    email: String,
    company: String,
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    getNotifications() {
      axios.get(`/notifications`).then((response) => {
        this.notifications = response.data;
      });
    },
    approve(value) {
      axios.get(`/notifications/approve/${value}`).then(() => {
        this.$root.$bvToast.toast("Approved", {
          toaster: "b-toaster-top-right",
          variant: "success",
        });
        this.getNotifications();
      });
    },
    decline(value) {
      axios.get(`/notifications/decline/${value}`).then(() => {
        this.$root.$bvToast.toast("Declined", {
          toaster: "b-toaster-top-right",
          variant: "success",
        });
        this.getNotifications();
      });
    },
  },
  created() {
    this.getNotifications();
  },
  filters: {
    time(value) {
      return moment(value).format("LT") == "Invalid date"
        ? ""
        : moment(value).format("LT");
    },
  },
};
</script>
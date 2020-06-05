<template>
  <b-card class="provider-card" @click="goToProfile(profile.id)">
    <div class="icon-card profile-data">
      <div class="icon-card-icon">
        <b-avatar
            :src="profileAvatarUrl"
            :size="$screens({ default: '54', sm: '64', md: '96', lg: '108' })"
        />
      </div>
      <div>
        <h2 class="company-title title">{{ profile.company_name }}</h2>
        <div class="icon-card">
          <svg-icon name="icon_location" class="icon-card-icon"/>
          <div v-if="profile.address">
            <span class="label">{{ profile.address.street_address }}</span>
            <span class="label label-miles" v-if="currentGeoLocation && profile.address.lat">
              +{{getDistanceTo([profile.address.lat, profile.address.lng])}}mi
            </span>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <b-row class="props">
      <b-col cols="4" class="col">
        <div class="icon-card">
          <svg-icon name="icon_per_run" class="icon-card-icon"/>
          <div>
            <span class="title">${{profile.rates_per_run}}</span>
            <span class="subtitle">Per run</span>
          </div>
        </div>
      </b-col>
      <b-col cols="4" class="col">
        <div class="icon-card">
          <svg-icon name="icon_cabling_pros" class="icon-card-icon"/>
          <div>
            <span class="title">{{profile.team_size}}</span>
            <span class="subtitle">Cabling Pros</span>
          </div>
        </div>
      </b-col>
      <b-col cols="4" class="col">
        <div class="icon-card">
          <svg-icon name="icon_reviews" class="icon-card-icon"/>
          <div>
            <span class="title">{{reviewsAvg}}<span class="muted">/5</span></span>
          </div>
        </div>
      </b-col>
    </b-row>

    <!--  Card Footer-->
    <template v-slot:footer>
      <b-button variant="light">
        <div class="icon-card">
          <svg-icon name="eye" class="icon-card-icon"/>
          <span>View Profile</span>
        </div>
      </b-button>
    </template>
  </b-card>
</template>

<script>
  import geoLocationMixin from "@/core/mixins/geo-location";
  import { mapGetters } from "vuex";

  export default {
    mixins: [geoLocationMixin],
    name: "ProviderCard",
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        profile: this.value,
      }
    },
    watch: {
      value(v) {
        this.profile = v;
      }
    },
    computed: {
      ...mapGetters('provider', ['profileExternalReviewsAverageFn']),
      profileAvatarUrl() {
        return this.profile.user?.images?.data?.length ? this.profile.user.images.data[this.profile.user.images.data.length - 1].url : null
      },
      reviewsAvg() {
        const float = this.profile?.reviews_avg_rating || 0;
        const int = Math.round(float);
        return float - int > 0 ? float : int;
      }
    },
    methods: {
      goToProfile(id) {
        this.$router.push({ name: 'provider.profile', params: { id } });
      }
    }
  }
</script>

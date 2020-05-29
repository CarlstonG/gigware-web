<template>
  <b-card class="provider-card">
    <div class="icon-card profile-data">
      <div class="icon-card-icon">
        <b-avatar
            :src="userAvatarUrl"
            :size="$screens({ default: '54', lg: '108' })"
        />
      </div>
      <div>
        <h2 class="company-title title">{{ profile.company_name }}</h2>
        <div class="icon-card">
          <svg-icon name="icon_location" class="icon-card-icon"/>
          <div>
            <span class="label">{{ profile.address.street_address }}</span>
            <span class="label muted ml-3" v-if="currentGeoLocation && profile.address.lat">
              <span class="mr-3">+{{getDistanceTo([profile.address.lat, profile.address.lng])}}mi</span>
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
            <span class="title">4.5<span class="muted">/5</span></span>
          </div>
        </div>
      </b-col>
    </b-row>

    <!--  Card Footer-->
    <template v-slot:footer>
      <b-button variant="light" @click="goToProfile(profile.id)" >
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
      userAvatarUrl() {
        return this.profile?.user?.images?.data?.length ? this.profile.user.images.data[0].url : '';
      }
    },
    methods: {
      goToProfile(id) {
        debugger
        this.$router.push({ name: 'provider.profile', params: { id } });
      }
    }
  }
</script>
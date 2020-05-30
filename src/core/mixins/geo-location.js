import { mapActions, mapGetters } from "vuex";

/*
 * GeoLocation
 * It works only on https:// server
 * @see: https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
 */

export default {
  methods: {
    ...mapActions('geoLocator', ["initialize"]),
  },
  computed: {
    ...mapGetters('geoLocator', ["getDistanceTo", "currentGeoLocation"]),
  },
  created() {
    this.initialize();

  }
}

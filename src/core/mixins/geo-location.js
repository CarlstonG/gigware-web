import { mapGetters } from "vuex";

/*
 * GeoLocation
 * It works only on https:// server
 * @see: https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
 */

export default {
  computed: {
    ...mapGetters('geoLocator', ["getDistanceTo", "currentGeoLocation"]),
  },
  created() {
    this.$store?.dispatch("geoLocator/initialize");
  }
}

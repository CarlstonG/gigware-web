import distance from "@turf/distance";

/*
 * GeoLocation
 * It works only on https:// server
 * @see: https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
 */
const geoOptions = {
  enableHighAccuracy: false, //defaults to false
  timeout: 15000, //defaults to Infinity
  maximumAge: 0 //defaults to 0
};

const geoDistanceOptions = { units: 'miles' };


// todo: make a module and get to state once. This impl generates as many geo as calls
export default {
  data: () => ({
    currentGeoLocation: null
  }),
  methods: {
    getDistanceTo(point) {
      if (!this.currentGeoLocation) return null;
      return distance(this.currentGeoLocation, point, geoDistanceOptions);
    }
  },
  created() {
    const _this = this;

    this.$getLocation(geoOptions)
      .then(coordinates => {
        console.log('$getLocation', coordinates);
        _this.currentGeoLocation = coordinates;
      });

    this.$watchLocation(geoOptions)
      .then(coordinates => {
        console.log('$watchLocation', coordinates);
        _this.currentGeoLocation = coordinates;
      })
  }
}

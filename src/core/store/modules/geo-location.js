import distance from "@turf/distance";
import VueGeolocation from "vue-browser-geolocation";

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

export default {
  namespaced: true,
  state: {
    initialized: false,
    current_geo_location: null,
  },
  getters: {
    currentGeoLocation: state => state.current_geo_location,
    getDistanceTo: state => point => {
      if (!state.current_geo_location) return null;
      const dist = distance(state.current_geo_location, point, geoDistanceOptions);

      return Math.round(dist);
    }
  },
  actions: {
    initialize({ state, commit }) {
      if (state.initialized) return;
      state.initialized = true;

      VueGeolocation.getLocation(geoOptions)
        .then(coordinates => {
          console.log('$getLocation', coordinates);
          commit('SET_CURRENT_GEO_LOCATION', [coordinates.lat, coordinates.lng]);
        })
        .catch(err => {
          console.log('geoLocation error:', err)
        });

      VueGeolocation.watchLocation(geoOptions)
        .then(coordinates => {
          console.log('$watchLocation', coordinates);
          commit('SET_CURRENT_GEO_LOCATION', [coordinates.lat, coordinates.lng]);
        })
        .catch(err => {
          console.log('geoLocation error:', err)
        });
    },
  },
  mutations: {
    SET_CURRENT_GEO_LOCATION(state, point) {
      state.current_geo_location = point;
    }
  }
}

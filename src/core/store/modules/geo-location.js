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
      debugger
      if (!state.current_geo_location) return null;
      const dist = distance(state.current_geo_location, point, geoDistanceOptions);

      return Math.round(dist);
    }
  },
  actions: {
    initialize({ state, commit }) {
      if (state.initialized) return;
      state.initialized = true;

      console.log('geo api initialization');

      setTimeout(() => {
        commit('SET_CURRENT_GEO_LOCATION', [45.56, 56.567]);
      }, 1000);

      setTimeout(() => {
        commit('SET_CURRENT_GEO_LOCATION', [5.56, 6.567]);
      }, 5000);

      VueGeolocation.getLocation(geoOptions)
        .then(coordinates => {
          console.log('$getLocation', coordinates);
          commit('SET_CURRENT_GEO_LOCATION', coordinates);
        });

      VueGeolocation.watchLocation(geoOptions)
        .then(coordinates => {
          console.log('$watchLocation', coordinates);
          commit('SET_CURRENT_GEO_LOCATION', coordinates);
        })
    },
  },
  mutations: {
    SET_CURRENT_GEO_LOCATION(state, point) {
      state.current_geo_location = point;
    }
  }
}

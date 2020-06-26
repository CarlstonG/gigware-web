import GoogleMapsApiLoader from "google-maps-api-loader";

/**
 * It seems that it is initialized once
 */
export default GoogleMapsApiLoader({
  libraries: ['places'],
  apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
})

<template>
  <b-modal v-model="isOpen" modal-class="google-map-modal" centered @shown="onModalShown">
    <template v-slot:default>
      <div class="google-map-wrapper">
        <div ref="map" class="google-map"></div>
      </div>
    </template>
  </b-modal>
</template>
<style scoped lang="scss" src="./SeeOnMapModal.scss"></style>

<script>
  import GoogleMapsApi from "@/core/misc/GoogleMapApi"

  export default {
    props: {
      value: {
        type: Object, // { lat: , lng: }
        default: null
      }
    },
    data() {
      return {
        isOpen: !!this.value,
        google: null,
        map: null,
        marker: null,
        circle: null,
      }
    },
    watch: {
      value(v) {
        this.isOpen = !!v;
      },
    },
    computed: {},
    methods: {
      loadGoogle() {
        GoogleMapsApi.then(google => {
          this.google = google
        })
      },
      createMap() {
        this.map = new this.google.maps.Map(this.$refs.map, {
          zoom: 8,
          center: {
            lat: parseFloat(this.value?.lat),
            lng: parseFloat(this.value?.lng)
          },
          disableDefaultUI: true,
          zoomControl: true
        });
        window.gmap = this.map;
        this.marker = new this.google.maps.Marker({ map: this.map })
      },
      drawCircle() {
        if (this.circle) this.circle.setMap(null)
        if (!this.value.work_radius) return

        this.circle = new this.google.maps.Circle({
          strokeColor: '#1994DB',
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillOpacity: 0,
          map: this.map,
          center: {
            lat: parseFloat(this.value?.lat),
            lng: parseFloat(this.value?.lng)
          },
          radius: parseInt(this.value.work_radius) * 1609.344, // Convert to kilometers, then to miles
        });
      },
      onModalShown() {
        this.createMap();
        this.drawCircle();
      }
    },
    created() {
      this.loadGoogle();
    }
  }
</script>

<style scoped>

</style>

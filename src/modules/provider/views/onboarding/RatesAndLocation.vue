<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="pr-5">
          <validated-b-form-group
            name="rates_per_run"
            label="What does your team charge per cable run?"
            :disabled="formLocked"
          >
            <div class="d-flex align-items-center">
              <span class="mr-2">$</span>
              <b-form-input
                v-model.trim.lazy="form.rates_per_run"
                placeholder="X.XX"
              />
            </div>
          </validated-b-form-group>
          <validated-b-form-group
            name="city"
            label="Your city"
            :disabled="formLocked"
          >
            <b-form-input
              v-model.trim.lazy="form.address.city"
              ref="autocomplete"
            />
          </validated-b-form-group>
          <validated-b-form-group
            name="work_radius"
            label="What mile radius beyond your city will your team work?"
            :disabled="formLocked"
          >
            <div class="d-flex align-items-center">
              <b-form-input
                v-model.trim.lazy="form.work_radius"
                @change="drawCircle"
                class="w-25 mr-2"
              />
              miles
            </div>
          </validated-b-form-group>
          <div
            ref="map"
            style="height: 215px; width: 100%; border: 1px solid #A0AEC0"
          ></div>
        </b-col>
        <b-col lg="6" class="pl-5">
          <p class="font-weight-bold">Business Address:</p>
          <validated-b-form-group
            name="street_address"
            label="Street Address"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.address.street_address" />
          </validated-b-form-group>
          <validated-b-form-group
            name="suite"
            label="Suite or #"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.address.suite" />
          </validated-b-form-group>
          <validated-b-form-group
            name="zip_code"
            label="Zip Code"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.address.zip_code" />
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer @next="submit" :loading="formLocked" :state="formState" />
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import GoogleMapsApiLoader from 'google-maps-api-loader'
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions } from 'vuex'

  export default {
    mixins: [validateFormMixin],
    components: { StepsFooter },
    data: () => ({
      form: {
        rates_per_run: '',
        work_radius: 0,
        address: {
          street_address: '',
          city: '',
          suite: 0,
          zip_code: '',
          lat: 0,
          lng: 0,
        },
      },
      google: null,
      map: null,
      marker: null,
      autocomplete: null,
      place: null,
      circle: null,
    }),
    validations: validations.onboarding.ratesAndLocation,
    methods: {
      ...mapActions('provider', ['createRatesAndLocation']),
      sendRequest() {
        this.createRatesAndLocation(this.form)
          .then(() => {
            this.$router.push({
              name: 'provider.onboarding.availability',
            })
          })
          .catch(error => {
            this.handleServerError(error)
          })
          .finally(() => {
            this.setDefaultState()
          })
      },
      loadGoogle() {
        GoogleMapsApiLoader({
          libraries: ['places'],
          apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
        }).then(google => {
          this.google = google

          this.createMap()
          this.createAutocomplete()
        })
      },
      createMap() {
        this.map = new this.google.maps.Map(this.$refs.map, {
          zoom: 4,
          center: { lat: 41.22988, lng: -103.257203 },
          disableDefaultUI: true,
        })
        this.marker = new this.google.maps.Marker({ map: this.map })
      },
      createAutocomplete() {
        this.autocomplete = new this.google.maps.places.Autocomplete(
          this.$refs.autocomplete.$el,
          { types: ['geocode'] },
        )
        this.addListener()
      },
      addListener() {
        this.autocomplete.addListener('place_changed', this.placeChanged)
      },
      placeChanged() {
        this.place = this.autocomplete.getPlace()
        this.form.address.city = this.place.address_components[0].long_name

        this.map.setZoom(8)
        this.map.setCenter({
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        })
        this.marker.setPosition({
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        })

        this.form.address.lat = this.place.geometry.location.lat()
        this.form.address.lng = this.place.geometry.location.lng()

        this.drawCircle()
      },
      drawCircle() {
        if (!this.form.address.city) return
        if (!this.form.work_radius) return
        if (this.circle) this.circle.setMap(null)

        this.circle = new this.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillOpacity: 0,
          map: this.map,
          center: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          },
          radius: parseInt(this.form.work_radius) * 1000 * 0.621371, // Convert to kilometers, then to miles
        })
      },
    },
    mounted() {
      this.loadGoogle()
    },
  }
</script>
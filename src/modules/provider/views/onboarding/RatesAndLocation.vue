<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="col-left">
          <validated-b-form-group
              name="rates_per_run"
              label="At a minimum, what does your team charge per installation run?"
              :disabled="formLocked"
              class="required"
          >
            <div class="d-flex align-items-center">
              <span class="mr-2">$</span>
              <b-form-input
                  v-model.trim.lazy="form.rates_per_run"
                  :placeholder="placeholders.rates_per_run"
              />
            </div>
          </validated-b-form-group>
          <!-- location address set not required -->
          <validated-b-form-group
              name="address.city"
              label="Your city"
              :disabled="formLocked"
              class=""
          >
            <b-form-input
                v-model.trim.lazy="form.address.city"
                :placeholder="placeholders.city"
                ref="autocomplete"
            />
          </validated-b-form-group>
          <validated-b-form-group
              name="work_radius"
              label="What mile radius beyond your city will your team work?"
              :disabled="formLocked"
              class="required"
          >
            <div class="d-flex align-items-center">
              <b-form-input
                  v-model.trim.lazy="form.work_radius"
                  :placeholder="placeholders.work_radius"
                  @input="drawCircle"
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
        <b-col lg="6" class="col-right">
          <p class="font-weight-bold">Business Address:</p>
          <validated-b-form-group
              name="address.street_address"
              label="Street Address"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.address.street_address"
                          :placeholder="placeholders.street_address"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="address.suite"
              label="Suite or #"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.address.suite"
                          :placeholder="placeholders.address_suite"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="address.zip_code"
              label="Zip Code"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.address.zip_code"
                          :placeholder="placeholders.zip_code"/>
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer :loading="formLocked" :state="formState"/>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
  import GoogleMapsApi from "@/core/misc/GoogleMapApi"
  import validations from '@/modules/provider/services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
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
      placeholders: placeholders,
      google: null,
      map: null,
      marker: null,
      autocomplete: null,
      autocompleteListener: null,
      place: null,
      circle: null,
    }),
    validations: validations.onboarding.ratesAndLocation,
    methods: {
      ...mapActions('provider', ['createRatesAndLocation', 'profileRequest']),
      sendRequest() {
        const _this = this;

        return this.createRatesAndLocation(this.form)
          .then(() => {
            // update data
            if (_this.providerProfileId) {
              _this.$store.commit('auth/SET_USER_PROVIDER_PROFILE', _this.form);
            }

            _this.afterSubmit()
          })
      },
      loadGoogle() {
        GoogleMapsApi.then(google => {
          this.google = google

          this.createMap()
          this.createAutocomplete()
          this.drawCircle()
        })
      },
      createMap() {
        this.map = new this.google.maps.Map(this.$refs.map, {
          zoom: this.form?.address?.lat ? 8 : 4,
          center: this.form?.address?.lat ?
            {
              lat: parseFloat(this.form.address.lat),
              lng: parseFloat(this.form.address.lng)
            }
            : { lat: 41.22988, lng: -103.257203 },
          disableDefaultUI: true,
          zoomControl: true
        });
        window.gmap = this.map;
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
        this.autocompleteListener = this.autocomplete.addListener('place_changed', this.placeChanged)
      },
      removeListener() {
        this.autocompleteListener?.remove();
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
        if (this.circle) this.circle.setMap(null)
        if (!this.form.address.city) return
        if (!this.form.work_radius) return

        this.circle = new this.google.maps.Circle({
          strokeColor: '#1994DB',
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillOpacity: 0,
          map: this.map,
          center: {
            lat: parseFloat(this.form.address.lat),
            lng: parseFloat(this.form.address.lng)
          },
          radius: parseInt(this.form.work_radius) * 1609.344, // Convert to kilometers, then to miles
        });
      },
    },
    computed: {
      ...mapGetters('auth', ['user', 'providerProfileId']),
    },
    mounted() {
      this.formState = 'loading';

      this.$auth.userFetched().then(() => {
        if (this.providerProfileId) {
          const profile = this.user.provider_profile;

          this.form = Object.assign(this.form, {
            rates_per_run: profile.rates_per_run,
            work_radius: profile.work_radius,
            address: Object.assign(this.form.address, profile.address)
          });
        }
      }).finally(() => {
        this.formState = 'default';
        this.loadGoogle()
      })
    },
    destroyed() {
      this.removeListener();
    }
  }
</script>

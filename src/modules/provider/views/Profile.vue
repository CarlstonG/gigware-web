<template>
  <div>
    <b-container fluid="sm" class="provider-profile">
      <div class="content" v-if="!isLoading && profile">
        <section>
          <div class="icon-card">
            <div class="icon-card-icon">
              <b-avatar
                  :src="profile.user.images && profile.user.images.data.length ? profile.user.images.data[0].url : ''"
                  :size="$screens({ default: '75', md: '125', xl: '200' })"
              />
            </div>
            <div class="profile-data">
              <h2 class="company-title title">{{ profile.company_name }}</h2>
              <div class="icon-card">
                <svg-icon name="icon_team_lead" class="icon-card-icon"/>
                <span class="label">{{ profile.user.first_name }} {{ profile.user.last_name }}</span>
              </div>
              <div class="icon-card">
                <svg-icon name="icon_location" class="icon-card-icon"/>
                <div>
                  <span class="label">{{ profile.address.street_address }}</span>
                  <span class="label muted ml-3" v-if="currentGeoLocation && profile.address.lat">
                    <span class="mr-3">+{{getDistanceTo([profile.address.lat, profile.address.lng])}}mi</span>
                    <a class="small" href="#">#See on Map</a>
                  </span>
                </div>
              </div>
              <a :href="'tel:' + profile.phone" class="btn btn-primary phone-button">Contact|{{ profile.phone }}</a>
            </div>
          </div>
        </section>

        <hr/>

        <section>
          <b-row class="props">
            <b-col cols="6" md="3">
              <div class="icon-card">
                <svg-icon name="icon_reviews" class="icon-card-icon"/>
                <div>
                  <div class="title">4.5<span class="muted">/5</span></div>
                  <div class="subtitle"><a href="#reviews-anchor">Reviews 5</a></div>
                </div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="icon-card">
                <svg-icon name="icon_per_run" class="icon-card-icon"/>
                <div>
                  <div class="title">${{profile.rates_per_run}}</div>
                  <div class="subtitle">Per run</div>
                </div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="icon-card">
                <svg-icon name="icon_cabling_pros" class="icon-card-icon"/>
                <div>
                  <div class="title">{{profile.team_size}}</div>
                  <div class="subtitle">Cabling Pros</div>
                </div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="icon-card">
                <svg-icon name="icon_completed_jobs" class="icon-card-icon"/>
                <div>
                  <div class="title">{{profile.experiences.data.length}}</div>
                  <div class="subtitle"><a href="#completed-jobs-anchor">Completed jobs</a></div>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>

        <hr/>

        <section class="about">
          <h3 class="title">About Us
            <svg-icon v-if="isAccountProfile"
                      name="edit_selection"
                      :width="$screens({ default: '18', md: '27' })"
                      class="editable-icon"
                      @click="$router.push({ name: 'provider.settings.basic-information'})"/>
          </h3>
          <div class="description">{{profile.description}}</div>

          <b-row class="props">
            <b-col cols="12" md="6">
              <div class="icon-card">
                <svg-icon name="icon_verified_credentials" class="icon-card-icon"/>
                <div>
                  <div class="title">{{profile.certificates.data.length}}
                    <span class="muted">/{{profile.certificates.data.length}}</span>
                  </div>
                  <div class="subtitle">
                    <a href="#" v-on:click="showProofOfInsurance($event)">Verified Credentials</a>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="icon-card">
                <svg-icon name="icon_certs" class="icon-card-icon"/>
                <div>
                  <div class="title">&nbsp;</div>
                  <div class="subtitle"><a href="#" v-on:click="showProofOfInsurance($event)">Prof of Insurance</a>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>

        <hr/>

        <section class="availability">
          <h3 class="title">Availability
            <svg-icon v-if="isAccountProfile"
                      name="edit_selection"
                      :width="$screens({ default: '18', md: '27' })"
                      class="editable-icon"
                      @click="$router.push({ name: 'provider.settings.availability'})"/>
          </h3>
          <div class="description"><span class="badge"></span>Unavailable</div>

          <b-row>
            <b-col cols="12" md="8">
              <availability-picker :value="profileAvailabilityDates" :disabled="true"/>
            </b-col>
          </b-row>
        </section>

        <hr/>

        <a id="completed-jobs-anchor"/>
        <section class="completed_jobs">
          <div class="title">Completed Jobs</div>
        </section>

        <div class="completed_jobs-gallery" v-if="profile.experiences.data.length">
          <b-row>
            <b-col cols="12" lg="4" class="completed_jobs-gallery-data">
              <hooper group="group1" :settings="hooperNoEvents">
                <slide v-for="item in profile.experiences.data" :key="item.id">
                  <h3 class="title">{{item.job_location}},</h3>
                  <div class="description">{{item.job_description}}</div>
                  <h3 class="employer-name">{{item.employer_name}}</h3>
                  <div class="employer-title muted">{{item.employer_title}}</div>
                  <div class="icon-card">
                    <svg-icon name="icon_contact_phone" class="icon-card-icon"/>
                    <div class="muted">{{item.employer_phone}}</div>
                  </div>
                </slide>

                <hooper-navigation slot="hooper-addons">
                  <svg-icon name="arrow_prev" slot="hooper-prev"/>
                  <svg-icon name="arrow_next" slot="hooper-next"/>
                </hooper-navigation>
              </hooper>
            </b-col>
            <b-col cols="12" lg="8" class="completed_jobs-gallery-images">
              <div class="completed_jobs-gallery-images-container">
                <hooper group="group1" :itemsToShow="$screens({ default: 1.5, lg: 2.25 })">
                  <slide v-for="item in profile.experiences.data" :key="item.id">
                    <div class="bg-image" :style="item.image.url | bgImage"></div>
                  </slide>
                </hooper>
              </div>
            </b-col>
          </b-row>
        </div>

        <hr/>

        <a id="reviews-anchor"/>
        <section class="reviews" v-if="profile.external_reviews.data.length">
          <div class="title">Reviews</div>

          <div class="review-card" v-for="item in profile.external_reviews.data.slice(0, reviewsToShow)" :key="item.id">
            <svg-icon name="quotes" class="quotes-icon"/>
            <div class="review-card-body">
              <div class="description">{{item.text}}</div>
              <b-form-rating :value="item.rating" variant="warning" no-border inline readonly></b-form-rating>
              <div class="name"><span class="badge"></span>{{item.first_name}} {{item.last_name}}</div>
            </div>
          </div>

          <div class="view-all">
            <b-link @click="showAllReviews">View all</b-link>
          </div>
        </section>

        <hr/>

        <section class="verified_credentials" v-if="profile.certificates.data.length">
          <div class="title">Verified Credentials</div>

          <div class="icon-card" v-for="item in profile.certificates.data" :key="item.id">
            <div>{{item.team_members_count}} / {{profile.team_size}} hold {{item.name}} license</div>
            <svg-icon name="icon_proof_of_insurance" class="icon-card-icon"/>
          </div>

          <div class="back-top">
            <div class="icon-card">
              <svg-icon name="arrow_up" class="icon-card-icon"/>
              <a href="#" v-on:click="scrollToTop($event)">Back to top</a>
            </div>
          </div>
        </section>
      </div>

    </b-container>

    <proof-of-insuarence-modal v-model="proofOfInsuranceData"/>

    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { mapActions, mapGetters, mapState } from "vuex";
  import { Hooper, Navigation as HooperNavigation, Slide } from 'hooper';
  import 'hooper/dist/hooper.css';
  import ProofOfInsuarenceModal from "../components/ProofOfInsuranceModal";
  import geoLocationMixin from "@/core/mixins/geo-location";
  import AvailabilityPicker from "../../../core/components/forms/AvailabilityPicker";

  export default {
    mixins: [geoLocationMixin],
    components: { AvailabilityPicker, ProofOfInsuarenceModal, SiteFooter, Hooper, Slide, HooperNavigation },
    data: () => ({
      hooperNoEvents: {
        mouseDrag: false,
        touchDrag: false,
        wheelControl: false,
        keysControl: false,
        shortDrag: false,
      },
      proofOfInsuranceData: null,
      reviewsToShow: 3,
    }),
    methods: {
      ...mapActions('provider', ['profileRequest']),
      scrollToTop(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
      },
      showProofOfInsurance(e) {
        e.preventDefault();
        // send new observer each time
        this.proofOfInsuranceData = Object.assign({}, this.provider_profile.certificates.data[
          0//Math.floor(Math.random() * this.provider_profile.certificates.data.length)
          ]) || {};
      },
      showAllReviews() {
        this.reviewsToShow = this.profile?.external_reviews?.data.length || 0;
      }
    },
    computed: {
      ...mapState('auth', ['user']),
      ...mapState('provider', ['provider_profile']),
      ...mapGetters('provider', ['isLoading', 'profileAvailabilityDates']),
      profile() {
        return this.provider_profile
      },
      isAccountProfile() {
        return this.user && this.provider_profile && this.user?.provider_profile?.id === this.provider_profile?.id;
      }
    },
    created() {
      this.profileRequest(this.$route.params.id);
    },
    mounted() {
      window.scrollTo(0, 0);
    }
  }
</script>


<template>
  <div class="provider-profile">
    <b-container fluid="sm">
      <div class="page content" v-if="!isLoading && profile">
        <section>
          <div class="icon-card">
            <div class="icon-card-icon">
              <b-avatar
                  :src="profileAvatarUrl"
                  :size="$screens({ default: '75', md: '125', xl: '200' })"
              />
            </div>
            <div class="profile-data">
              <h2 class="company-title title">{{ profile.company_name }}</h2>
              <div class="icon-card">
                <svg-icon name="icon_team_lead" class="icon-card-icon"/>
                <span class="label">{{ profile.user.first_name }} {{ profile.user.last_name }}</span>
              </div>
              <div class="icon-card" v-if="profile.address">
                <svg-icon name="icon_location" class="icon-card-icon"/>
                <div class="address-wrapper">
                  <span class="label">{{ profile.address.street_address }}</span>
                  <span class="label muted distance" v-if="currentGeoLocation && profile.address.lat">
                    <span>+{{getDistanceTo([profile.address.lat, profile.address.lng])}}mi</span>
                  </span>
                  <b-link class="see-on-map" href="#" @click="seeOnMap($event)">See on Map</b-link>
                </div>
              </div>
              <a href="#" class="btn btn-primary phone-button">Contact|(XXX)-XXX-XXXX</a>
              <!--              <a :href="'tel:' + profile.phone" class="btn btn-primary phone-button">Contact|{{ profile.phone }}</a>-->
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
                  <div class="title">{{profileExternalReviewsAverage}}<span class="muted">/5</span></div>
                  <div class="subtitle" v-if="profileExternalReviewsCount">
                    <a href="#reviews-anchor" v-smooth-scroll="{updateHistory: false}">Reviews
                      {{profileExternalReviewsCount}}</a>
                  </div>
                  <div class="subtitle" v-else>
                    No reviews
                  </div>
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
                  <div class="subtitle">Security Pros</div>
                </div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="icon-card">
                <svg-icon name="icon_completed_jobs" class="icon-card-icon"/>
                <div>
                  <div class="title">{{profile.experiences.data.length}}</div>
                  <div class="subtitle"><a href="#completed-jobs-anchor" v-smooth-scroll="{updateHistory: false}">Completed
                    jobs</a></div>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>

        <hr/>

        <!-- adding video share @Jeff-->


        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Share Video</button>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Share a video link.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Video Link:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Share</button>
      </div>
    </div>
  </div>
</div>

    <!-- share vid ends here -->

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
            <b-col cols="12" md="6" v-if="profile.certificates.data.length">
              <div class="icon-card">
                <svg-icon name="icon_verified_credentials" class="icon-card-icon"/>
                <div>
                  <div class="title">{{verifiedCertificateCount}}
                    <span class="muted">/{{profile.certificates.data.length}}</span>
                  </div>
                  <div class="subtitle">
                    <a href="#verified-credentials-anchor" v-smooth-scroll="{updateHistory: false}">Verified
                      Credentials</a>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="6" v-if="profile.insurance">
              <div class="icon-card">
                <svg-icon name="icon_certs" class="icon-card-icon"/>
                <div>
                  <div class="title">&nbsp;</div>
                  <div class="subtitle"><a href="#" v-on:click="showProofOfInsurance($event)">Proof of Insurance</a>
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

        <experiences-slider class="completed_jobs-gallery" :value="profile.experiences.data"/>

        <a id="reviews-anchor"/>
        <hr v-if="profileExternalReviewsCount"/>

        <section class="reviews" v-if="profileExternalReviewsCount">
          <div class="title">Reviews</div>

          <div class="review-card" v-for="item in profile.external_reviews.data.slice(0, reviewsToShow)" :key="item.id">
            <svg-icon name="quotes" class="quotes-icon"/>
            <div class="review-card-body">
              <div class="description">{{item.text}}</div>
              <b-form-rating :value="item.rating" variant="warning" no-border inline readonly></b-form-rating>
              <div class="name"><span class="badge"></span>{{item.first_name}} {{item.last_name}}</div>
            </div>
          </div>

          <div class="view-all" v-if="reviewsToShow < profileExternalReviewsCount">
            <b-link @click="showAllReviews">View all</b-link>
          </div>
        </section>

        <hr/>

        <a id="verified-credentials-anchor"/>
        <section class="verified-credentials" v-if="profile.certificates.data.length">
          <div class="title">Verified Credentials</div>

          <b-row v-for="item in profile.certificates.data" :key="item.id">
            <b-col cols="10" lg="6" xl="5">
              <div class="icon-card">
                <div>{{item.team_members_count}} / {{profile.team_size}} team members hold a {{item.name}} license</div>
              </div>
            </b-col>
            <b-col class="icon-col" cols="2" lg="2">
              <svg-icon name="icon_proof_of_insurance" class="icon-card-icon" v-if="item.is_verified"/>
              <svg-icon name="icon_proof_of_insurance_disabled" class="icon-card-icon" v-else/>
            </b-col>
          </b-row>

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
    <see-on-map-modal v-model="seeOnMapData"/>

    <site-footer/>
  </div>
</template>
<style scoped lang="scss" src="./Profile.scss"></style>

<script>
  import SiteFooter from '@/core/components/global/Footer'
  import { mapActions, mapGetters, mapState } from "vuex";
  import ProofOfInsuarenceModal from "../components/ProofOfInsuranceModal";
  import geoLocationMixin from "@/core/mixins/geo-location";
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import AvailabilityPicker from "../../../core/components/forms/AvailabilityPicker";
  import ExperiencesSlider from "../components/ExperiencesSlider";
  import SeeOnMapModal from "../../../core/components/modal/SeeOnMapModal";

  export default {
    mixins: [geoLocationMixin, validateFormMixin],
    components: { SeeOnMapModal, ExperiencesSlider, AvailabilityPicker, ProofOfInsuarenceModal, SiteFooter },
    data: () => ({
      proofOfInsuranceData: null,
      seeOnMapData: null,
      reviewsToShow: 3,
    }),
    watch: {
      '$route.params.id': function () {
        this.loadContent();
      }
    },
    methods: {
      ...mapActions('provider', ['profileRequest']),
      loadContent() {
        this.profileRequest(this.$route.params.id)
          .catch(error => {
            this.serverError = error;

            if (this.statusCode === 404) {
              this.$router.push({ name: '404' })
            } else {
              this.handleServerError(error)
            }
          });
      },
      scrollToTop(e) {
        e.preventDefault();
        this.$smoothScroll({
          scrollTo: window.document.getElementsByTagName('body')[0],
          updateHistory: false
        })
        window.scrollTo(0, 0);
      },
      showProofOfInsurance(e) {
        e.preventDefault();
        // send new observer each time
        const insurance = this.profile?.insurance;
        this.proofOfInsuranceData = insurance ? JSON.parse(JSON.stringify(insurance)) : {};
      },
      seeOnMap(e) {
        e.preventDefault();
        this.seeOnMapData = {
          lat: this.profile.address.lat,
          lng: this.profile.address.lng,
          work_radius: this.profile.work_radius,
        };
      },
      showAllReviews() {
        this.reviewsToShow = this.profileExternalReviewsCount;
      }
    },
    computed: {
      ...mapState('auth', ['user']),
      ...mapState('provider', ['provider_profile']),
      ...mapGetters('provider', ['isLoading', 'profileAvatarUrl', 'profileAvailabilityDates', 'profileExternalReviewsCount', 'profileExternalReviewsAverage']),
      profile() {
        return this.provider_profile
      },
      isAccountProfile() {
        return this.user && this.provider_profile && this.user?.provider_profile?.id === this.provider_profile?.id;
      },
      verifiedCertificateCount() {
        return (this.profile?.certificates?.data || []).filter(item => item.is_verified).length
      }
    },
    created() {
      this.loadContent();
    }
  }
</script>


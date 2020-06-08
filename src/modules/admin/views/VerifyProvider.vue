<template>
  <div class="verify-provider">
    <sub-navbar>
      <template v-slot:left-side>
        <b-nav-text>
          Admin verify Account
        </b-nav-text>
      </template>
      <template v-slot:right-side>
        <b-button variant="light">
          Delete account
        </b-button>
        <b-button variant="primary">
          Save Changes
        </b-button>
      </template>
    </sub-navbar>
    <b-container fluid="sm" class="verify-provider-container">
      <div class="page content" v-if="!isLoading && profile">
        <section>
          <div class="icon-card">
            <div class="icon-card-icon">
              <verify-input column>
                <b-avatar
                    :src="profileAvatarUrl"
                    :size="$screens({ default: '75', md: '125', xl: '200' })"
                />
              </verify-input>
            </div>
            <div class="profile-data">
              <h2 class="company-title title">
                <verify-input>{{ profile.company_name }}</verify-input>
              </h2>
              <div class="icon-card">
                <svg-icon name="icon_team_lead" class="icon-card-icon"/>
                <span class="label"><verify-input>{{ profile.user.first_name }} {{ profile.user.last_name }}</verify-input></span>
              </div>
              <div class="icon-card">
                <svg-icon name="icon_location" class="icon-card-icon"/>
                <div>
                  <span class="label"><verify-input>{{ profile.address.street_address }}</verify-input></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr>

        <section>

        </section>
      </div>
    </b-container>
  </div>
</template>
<style scoped lang="scss" src="./VerifyProvider.scss"></style>

<script>
  import SubNavbar from "../components/SubNavbar";
  import { mapActions, mapGetters, mapState } from "vuex";
  import VerifyInput from "../components/VerifyInput";

  export default {
    methods: {
      ...mapActions('provider', ['profileRequest']),
    },
    components: { VerifyInput, SubNavbar },
    computed: {
      ...mapState('provider', ['provider_profile']),
      ...mapGetters('provider', ['isLoading', 'profileAvatarUrl', 'profileAvailabilityDates', 'profileExternalReviewsCount', 'profileExternalReviewsAverage']),
      profile() {
        return this.provider_profile
      },
    },
    created() {
      this.profileRequest(this.$route.params.id).catch(error => {
        this.serverError = error;

        if (this.statusCode === 404) {
          this.$router.push({ name: '404' })
        } else {
          this.handleServerError(error)
        }
      });
    }
  }
</script>

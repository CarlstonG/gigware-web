<template>
  <div class="home">
    <b-row no-gutters>
      <b-col lg="6">
        <div class="text-block block-text-left">
          <div class="w-100">
            <div class="title">
              <p>Your Source for</p>
              <p>
                <span class="text-primary">Accountable</span>
                and
              </p>
              <p>
                <span class="text-primary">Reliable</span>
                Security Partners
              </p>
            </div>
            <search-bar no-left-filter @onSearch="$router.push({ name: 'search-partners'})"/>
            <p class="subtitle">
              Want to become a Security Partner?
              <b-link :to="{ name: 'register' }">
                Build a Profile
              </b-link>
            </p>
          </div>
        </div>
      </b-col>
      <b-col lg="6">
        <img src="/images/home_image.png" class="img-fluid" alt="Gigwire" />
      </b-col>
    </b-row>
    <b-row class="connect-your-team" style="background-color: #FAFAFB" no-gutters>
      <b-col lg="6">
        <img src="/images/home_image_2.png" class="img-fluid"/>
      </b-col>
      <b-col lg="6">
        <div class="text-block block-text-right">
          <div>
            <div class="title">
              <p>Connect your security team</p>
              <p>with more business.</p>
            </div>
            <div class="subtitle mt-4 mb-4">
              How do we do it?
              <b-link :to="{ name: 'register' }">
                Build a Profile
              </b-link>
            </div>
            <div class="content">
              <p class="pb-4">
                With Gig Wire, our Security Partners post their contact
                information, rates, credentials and more for free.
              </p>
              <p class="pb-4">
                Teams are discovered and get extra work while integrators find
                reliable Security Professionals.
              </p>
            </div>
            <b-button :to="{ name: 'register' }" variant="primary" size="lg">
              Build a Profile
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="text-block why-us">
      <div class="title">
        Why Choose Gig Wire
      </div>
      <b-row class="why-us-items">
        <b-col sm="12" md="6">
          <div class="icon-card">
            <svg-icon class="icon-card-icon" name="more_work" :width="$screens({ default: '28', lg: '48'})"/>
            <div>
              <div class="title">Get More Work</div>
              <p>Gig Wire helps you advertise, increases</p>
              <p>market access, and leads to new jobs.</p>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6">
          <div class="icon-card">
            <svg-icon class="icon-card-icon" name="money" :width="$screens({ default: '28', lg: '48'})"/>
            <div>
              <div class="title">Make More Money</div>
              <p>Set your own rates, find consistent work, and</p>
              <p>increase your earning potential.</p>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6">
          <div class="icon-card">
            <svg-icon class="icon-card-icon" name="build_trust" :width="$screens({ default: '28', lg: '48'})"/>
            <div>
              <div class="title">Build Customer Trust</div>
              <p>Gig Wire partners show they’re ready for the job</p>
              <p>by providing the important information upfront.</p>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div class="icon-card">
            <svg-icon class="icon-card-icon" name="schedule_management" :width="$screens({ default: '28', lg: '48'})"/>
            <div>
              <div class="title">Schedule Management</div>
              <p>With access to more projects, you build a schedule</p>
              <p>around your team’s needs—to work when you want.</p>
            </div>
          </div>
        </b-col>
      </b-row>
        <div class="view-partners">
          <b-button :to="{ name: 'search-partners' }">
            <span>View Partners</span>
            <svg-icon name="arrow_right" :width="$screens({ default: '12', lg: '15'})"/>
          </b-button>
        </div>
    </div>
    <b-row no-gutters>
      <b-col lg="6">
        <div class="text-block block-text-left advertise-for-free">
          <div>
            <div class="w-100">
              <div class="title">
                <p>Advertise for free</p>
                <p>by sharing:</p>
              </div>
              <b-row class="content mb-5">
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4"/>
                  Your rates
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Credentials
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Team Size
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Experience
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Contact Information
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Proof of Insurance
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Location
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Referrals
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Reviews
                </b-col>
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
                  Completed Jobs
                </b-col>
              </b-row>
            </div>
            <b-button :to="{ name: 'register' }" variant="primary" size="lg">
              Build a Profile
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col lg="6">
        <img src="/images/home_image_3.png" class="img-fluid" alt="Gigwire" />
      </b-col>
    </b-row>
    <site-footer />
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import SearchBar from "../../modules/search/components/SearchBar";

  export default {
    components: { SearchBar, SiteFooter },
  }
</script>

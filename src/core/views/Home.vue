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
                Cabling Partners
              </p>
            </div>
            <b-input-group class="mt-sm-5 mb-sm-5 mt-3 mb-3">
              <template #prepend>
                <b-dropdown text="Dropdown" no-caret>
                  <template #button-content>
                    <span class="text-muted mr-2">Zip Code</span>
                    <svg-icon name="caret" class="caret mr-1" />
                  </template>
                  <b-dropdown-item>Zip Code</b-dropdown-item>
                  <b-dropdown-item>Team Name</b-dropdown-item>
                </b-dropdown>
              </template>
              <span class="separator"></span>
              <b-form-input
                class="border-left-0 pl-2 pl-sm-3"
                placeholder="Find cabling partners by Zip Code"
              />
              <template #append>
                <b-button variant="primary">Search</b-button>
              </template>
            </b-input-group>
            <p class="subtitle">
              Want to become a Cabling Partner?
              <b-link :to="{ name: 'auth' }">
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
    <b-row style="background-color: #FAFAFB" no-gutters>
      <b-col lg="6">
        <img src="/images/home_image_2.png" class="img-fluid" />
      </b-col>
      <b-col lg="6">
        <div class="text-block block-text-right">
          <div>
            <div class="title">
              <p>Connect your cable team</p>
              <p>with more business.</p>
            </div>
            <div class="subtitle mt-5 mb-5">
              How do we do it?
              <b-link :to="{ name: 'auth' }">
                Build a Profile
              </b-link>
            </div>
            <div class="content">
              <p class="pb-4">
                With Gig Wire, our Cabling Partners post their contact
                information, rates, credentials and more for free.
              </p>
              <p class="pb-4">
                Teams are discovered and get extra work while integrators find
                reliable Cabling Professionals.
              </p>
            </div>
            <b-button :to="{ name: 'auth' }" variant="primary" size="lg">
              Build a Profile
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="text-block why-us pt-5 pb-5">
      <b-container class="pt-5 pb-5">
        <div class="title mb-3">
          Why Choose Gig Wire
        </div>
        <b-row class="mb-5">
          <b-col>
            <why-us-item>
              <template #icon>
                <svg-icon name="more_work" width="60" height="59" />
              </template>
              <template #title>
                Get More Work
              </template>
              <p>Gig Wire helps you advertise, increases</p>
              <p>market access, and leads to new jobs.</p>
            </why-us-item>
          </b-col>
          <b-col>
            <why-us-item>
              <template #icon>
                <svg-icon name="money" width="64" height="64" />
              </template>
              <template #title>
                Make More Money
              </template>
              <p>Set your own rates, find consistent work, and</p>
              <p>increase your earning potential.</p>
            </why-us-item>
          </b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col>
            <why-us-item>
              <template #icon>
                <svg-icon name="build_trust" height="76" />
              </template>
              <template #title>
                Build Customer Trust
              </template>
              <p>Gig Wire partners show they’re ready for the job</p>
              <p>by providing the important information upfront.</p>
            </why-us-item>
          </b-col>
          <b-col>
            <why-us-item>
              <template #icon>
                <svg-icon name="schedule_management" width="45" height="50" />
              </template>
              <template #title>
                Schedule Management
              </template>
              <p>With access to more projects, you build a schedule</p>
              <p>around your team’s needs—to work when you want.</p>
            </why-us-item>
          </b-col>
        </b-row>
        <div class="view-partners">
          <b-button>
            <span>View Partners</span>
            <svg-icon name="arrow_right" width="15" height="15" />
          </b-button>
        </div>
      </b-container>
    </div>
    <b-row no-gutters>
      <b-col lg="6">
        <div class="text-block block-text-left">
          <div>
            <div class="w-100">
              <div class="title mb-5">
                <p>Advertise for free</p>
                <p>by sharing:</p>
              </div>
              <b-row class="content mb-5">
                <b-col lg="6" class="d-flex mb-4">
                  <svg-icon name="checkmark" width="24" class="mr-4" />
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
            <b-button :to="{ name: 'auth' }" variant="primary" size="lg">
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
  import WhyUsItem from '@/core/components/home/WhyUsItem'
  export default {
    components: { SiteFooter, WhyUsItem },
  }
</script>

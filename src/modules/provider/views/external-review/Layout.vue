<template>
  <div :class="'external-review ' + addClass">
    <b-container>
      <b-row>
        <b-col lg="5" offset-xl="1">
          <div v-if="reviewHasBeenSentToProfile">
            <h2 class="title">Thank you for reviewing {{reviewHasBeenSentToProfile.company_name}}</h2>
            <div class="success-description">
              <p>We have notified {{reviewHasBeenSentToProfile.company_name}} about your review!</p>
              <p>Looking to find more Cabling Pros? Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore.</p>
            </div>
            <b-button variant="primary" :to="{ name: 'search-partners' }">View Partners</b-button>
          </div>
          <router-view @reviewSent="onReviewSent" v-else/>
        </b-col>
      </b-row>
    </b-container>
    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'

  export default {
    components: { SiteFooter },
    data: () => ({
      reviewHasBeenSentToProfile: null
    }),
    computed: {
      addClass() {
        return this.$route.meta.addClass
      },
      subtitle() {
        return this.$route.meta.subtitle
      },
    },
    methods: {
      onReviewSent(e) {
        this.reviewHasBeenSentToProfile = e;
      }
    }
  }
</script>

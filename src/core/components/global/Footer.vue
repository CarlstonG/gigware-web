<template>
  <footer>
    <b-container>
      <b-row class="wrapper">
        <b-col sm="12" lg="4" xl="3" offset-xl="3" class="brand">
          <svg-icon name="logo" :height="$screens({default: '28', md: '49'})"/>
        </b-col>
        <b-col sm="6" lg="4" xl="3" class="with-space">
          <h4>Quick Links</h4>
          <ul class="list-unstyled">
            <li>
              <router-link :to="{ name: 'contact-us' }">Support</router-link>
            </li>
            <li>
              <router-link to="/faq">FAQ</router-link>
            </li>
            <li>
              <router-link to="/terms">Terms of Service</router-link>
            </li>
            <li>
              <router-link to="/policy">Privacy Policy</router-link>
            </li>
          </ul>
        </b-col>
        <b-col sm="6" lg="4" xl="3">
          <h4>Contact us</h4>
          <ul class="list-unstyled">
            <li>
              <b-link href="mailto:info@gigwire.com">info@gigwire.com</b-link>
            </li>
            <li>
              <b-link href="tel:713-300-0575">713-300-0575</b-link>
            </li>
          </ul>

          <div class="social">
            <b-link href="https://www.facebook.com/gigwireteam/" target="_blank">
              <svg-icon name="facebook_footer" :width="$screens({ default: '32', md: '32' })"/>
            </b-link>
            <b-link>
              <svg-icon name="linkedin_footer" :width="$screens({ default: '32', md: '32' })"/>
            </b-link>
            <b-link>
              <svg-icon name="instagram_footer" :width="$screens({ default: '32', md: '32' })"/>
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="copyright">
      <b-container>
        &copy; {{new Date().getFullYear()}} Gig Wire. All Rights Reserved
      </b-container>
    </div>
  </footer>
</template>
<style scoped lang="scss" src="./Footer.scss"></style>

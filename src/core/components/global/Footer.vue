<template functional>
  <footer>
    <b-container>
      <b-row class="wrapper">
        <b-col lg="4"><svg-icon name="logo" width="205" height="49" /></b-col>
        <b-col lg="4">
          <h4>Quick Links</h4>
          <p>
            <router-link :to="{ name: 'contact-us' }">Support</router-link>
          </p>
          <p>
            <router-link to="/faq">FAQ</router-link>
          </p>
          <p>
            <router-link to="/terms">Terms of Service</router-link>
          </p>
          <p>Privacy Policy</p>
        </b-col>
        <b-col lg="4">
          <h4>Contact us</h4>
          <p>info@gigwire.com</p>
          <p>713-300-0575</p>
          <p>
            <b-link class="mr-3" href="https://www.facebook.com/gigwireteam/" target="_blank">
              <svg-icon name="facebook_footer" width="30" height="30" />
            </b-link>
            <b-link class="mr-3">
              <svg-icon name="linkedin_footer" width="30" height="30" />
            </b-link>
            <b-link>
              <svg-icon name="instagram_footer" width="30" height="30" />
            </b-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <div class="text-center border-top border-light pt-3 pb-3">
      © 2020 Gig Wire. All Rights Reserved
    </div>
  </footer>
</template>
<style scoped lang="scss" src="./Footer.scss"></style>

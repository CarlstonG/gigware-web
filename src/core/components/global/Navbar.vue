<template>
  <div class="navbar-holder">
    <div :class="'navbar-wrapper' + (isFloating ? ' navbar-wrapper-floating' : '')">
      <!-- mobile navbar -->
      <b-navbar toggleable="lg" type="light" class="mobile">
        <div class="top-wrapper">
          <div class="container">
            <b-navbar-toggle class="border-0 p-0" target="nav-collapse" />
            <b-navbar-brand :to="{ name: 'home' }">
              <img src="/images/logo-white.png" alt="Gig Wire" />
            </b-navbar-brand>
          </div>
        </div>
        <div class="collapse-wrapper">
          <div class="container">
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto align-items-center">
               
               <!-- // Hidden FAQ as per ticket -->
               <!--
                <b-nav-item class="with-space" :to="{name: 'faq'}" v-if="!isAdmin">FAQ</b-nav-item> -->
               
               
                <navbar-item-account />

                <template v-if="!isAdmin">
                  <b-nav-item></b-nav-item>
                  <b-nav-item 
                  class="text-primary button"
                  :to="{ name: 'register' }" v-if="!user">Build a profile</b-nav-item>
                  
                  
                 <!-- <b-nav-item
                    class="text-primary with-space"
                    v-if="user"
                    :to="{ name: 'search-partners' }"
                  >View Partners</b-nav-item> -->
                
                
                </template> 
              </b-navbar-nav>
            </b-collapse>
          </div>
        </div>
      </b-navbar>

      <!-- desktop navbar -->
      <b-navbar toggleable="lg" type="light" class="container desktop">
        <b-navbar-toggle class="border-0 p-0" target="nav-collapse" />
        <b-navbar-brand :to="{ name: 'home' }">
          <img src="/images/logo-white.png" alt="Gig Wire" />
          
        </b-navbar-brand>
   
                
        
        
        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav class="ml-auto align-items-center">
            <!--//
              //
            // remove double button showing faq and tracktime on desktop menu-->
         

         <!-- // Hidden FAQ as per ticket -->
            <!--  <b-nav-item :to="{ name: 'faq' }" v-if="!isAdmin && !user">
              FAQ
            </b-nav-item>
            // Added tracktime-->
            <!-- <b-nav-item class="with-space" :to="{name: 'faq'}" v-if="!isAdmin">
                  TrackTime
            </b-nav-item>-->

            <template v-if="!isAdmin && user">
              
              <b-nav-item :to="{ name: 'contact-us' }" v-if="user && user.is_verified">Support</b-nav-item>
              <b-nav-item class="with-space" :to="{name: 'tracker-dashboard'}" v-if="user && user.is_verified">Track Time</b-nav-item>
              <b-nav-item :to="{ name: 'search-partners' }" v-if="user && user.is_verified">Search Partners</b-nav-item>
            </template>
            
            <!--<b-nav-item :to="{ name: 'faq' }" v-if="!isAdmin && !user && !tracker">FAQ</b-nav-item> -->
            
            
         

            <template v-if="!isAdmin">
              <b-navbar-nav class="navUsers mr-5" lign-h="center">
                 <b-nav-item :to="{ name: 'register' }" v-if="!user">Clients</b-nav-item>
                <b-nav-item class="mr-5" :to="{ name: 'workers' }" v-if="!user">Workers</b-nav-item>
                <b-nav-item href="#"></b-nav-item>


                <!-- Buffer spacing -->
                <b-nav-item class="mr-5" href="#"></b-nav-item>
                <b-nav-item class="mr-5" href="#"></b-nav-item>
              </b-navbar-nav>
              <navbar-item-account />
              <b-nav-item :to="{ name: 'tracker-registration' }" v-if="!user && !tracker">Track Time</b-nav-item>
                    
                   <b-button class="button" 
                  variant="primary"
                  :to="{ name: 'register' }" v-if="!user">Sign Up</b-button>
              <!--              <b-button-->
              <!--                  variant="primary"-->
              <!--                  size="lg"-->
              <!--                  class="ml-lg-4"-->
              <!--                  v-if="user"-->
              <!--                  :to="{ name: 'search-partners' }"-->
              <!--              >-->
              <!--                &lt;!&ndash; for signed in only &ndash;&gt;-->
              <!--                View Partners-->
              <!--              </b-button>-->
            </template>
            <template>
            

        <!-- View partners hidden -->        
            
            <!--  <b-button
                :to="{ name: 'search-partners' }"
                variant="primary"
                size="lg"
                class="ml-lg-4"
                v-if="!tracker"
              >View Partners</b-button> -->
            
            
            </template>

            <!-- tracker -->
            <template v-if="tracker !== null">
              <Notification :email="tracker.email" :company="tracker.company_name" />
              <b-button variant="primary" size="lg" class="ml-lg-4">Invite Members</b-button>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<style type="text/css">
@media screen and (max-width: 1200px) {
    .navUsers nav {
         font-size:80%;
    }
}
</style>


<script>
import NavbarItemAccount from "./NavbarItemAccount";
import Notification from "./Notification";
import { mapGetters } from "vuex";

export default {
  components: { NavbarItemAccount, Notification },
  data: () => ({
    isFloating: true, // always has the box-shadow
    tracker: null,
  }),
  watch: {
    $route() {
      // this.initFloatingDetection();
    },
    tracker() {
      console.log(this.tracker);
      return this.tracker;
    },
  },
  methods: {
    initFloatingDetection() {
      window.removeEventListener("scroll", this.handleScroll);
      const subNavbar = window.document.getElementsByClassName(
        "sub-navbar-holder"
      );
      if (!subNavbar || !subNavbar.length) {
        window.addEventListener("scroll", this.handleScroll);
      } else {
        this.isFloating = true;
      }
    },
    handleScroll() {
      this.isFloating = window.scrollY > 10;
    },
    logoutTracker() {
      this.logoutTracker();
    },
  },
  computed: {
    ...mapGetters("auth", ["user", "isAdmin"]),
  },
  mounted() {
    // this.initFloatingDetection();
    this.tracker = JSON.parse(localStorage.getItem("tracker"));
    console.log(this.user);
  },
  destroyed() {
    //window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

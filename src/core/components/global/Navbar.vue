<template>
  <div class="navbar-holder">
    <div :class="'navbar-wrapper' + (isFloating ? ' navbar-wrapper-floating' : '')">
      <!-- mobile navbar -->
      <b-navbar toggleable="lg" type="light" class="mobile">
        <div class="top-wrapper">
          <div class="container">
            <b-navbar-toggle class="border-0 p-0" target="nav-collapse"/>
            <b-navbar-brand :to="{ name: 'home' }">
              <img src="/images/logo-white.png" alt="Gig Wire"/>
            </b-navbar-brand>
          </div>
        </div>
        <div class="collapse-wrapper">
          <div class="container">
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto align-items-center">
                <b-nav-item class="with-space" :to="{name: 'faq'}" v-if="!isAdmin">
                  FAQ
                </b-nav-item>
                <navbar-item-account/>

                <template v-if="!isAdmin">
                  <b-nav-item></b-nav-item>
                  <b-nav-item :to="{ name: 'register' }" v-if="!user">Build a profile</b-nav-item>
                  <b-nav-item class="text-primary with-space" v-if="user" :to="{ name: 'search-partners' }">
                    View Partners
                  </b-nav-item>
                </template>
              </b-navbar-nav>
            </b-collapse>
          </div>
        </div>
      </b-navbar>

      <!-- desktop navbar -->
      <b-navbar toggleable="lg" type="light" class="container desktop">
        <b-navbar-toggle class="border-0 p-0" target="nav-collapse"/>
        <b-navbar-brand :to="{ name: 'home' }">
          <img src="/images/logo-white.png" alt="Gig Wire"/>
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto align-items-center">
            <b-nav-item :to="{ name: 'faq' }" v-if="!isAdmin && !user">
              FAQ
            </b-nav-item>
            <template v-if="!isAdmin && user">
              <b-nav-item :to="{ name: 'contact-us' }">
                Support
              </b-nav-item>
              <b-nav-item :to="{ name: 'search-partners' }">
                View Partners
              </b-nav-item>
            </template>
            <navbar-item-account/>

            <template v-if="!isAdmin">
              <b-nav-item :to="{ name: 'register' }" v-if="!user">Build a profile</b-nav-item>
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
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  import NavbarItemAccount from "./NavbarItemAccount";
  import { mapGetters } from "vuex";

  export default {
    components: { NavbarItemAccount },
    data: () => ({
      isFloating: false
    }),
    watch: {
      $route() {
        this.initFloatingDetection();
      }
    },
    methods: {
      initFloatingDetection() {
        window.removeEventListener('scroll', this.handleScroll);
        const subNavbar = window.document.getElementsByClassName('sub-navbar-holder');
        if (!subNavbar || !subNavbar.length) {
          window.addEventListener('scroll', this.handleScroll);
        } else {
          this.isFloating = true;
        }
      },
      handleScroll() {
        this.isFloating = window.scrollY > 10
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'isAdmin'])
    },
    mounted() {
      this.initFloatingDetection();
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  }
</script>

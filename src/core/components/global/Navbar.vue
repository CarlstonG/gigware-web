<template>
  <div class="navbar-holder">
    <div :class="'navbar-wrapper' + (isFloating ? ' navbar-wrapper-floating' : '')">
      <b-navbar toggleable="lg" type="light" class="container">
        <b-navbar-toggle class="border-0 p-0" target="nav-collapse"/>
        <b-navbar-brand :to="{ name: 'home' }">
          <img src="/images/logo-white.png" alt="Gig Wire"/>
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto align-items-center">
            <b-nav-item :to="{name: 'faq'}" v-if="!isAdmin">
              FAQ
            </b-nav-item>
            <navbar-item-account/>

            <template v-if="!isAdmin">
              <b-nav-item></b-nav-item>
              <b-nav-item :to="{ name: 'register' }" v-if="!user">Build a profile</b-nav-item>
              <b-button
                  variant="primary"
                  size="lg"
                  class="d-none d-lg-block ml-lg-4"
                  v-if="user"
                  :to="{ name: 'search-partners' }"
              >
                <!-- for signed in only -->
                View Partners
              </b-button>
              <b-nav-item class="mt-3 mt-lg-0 d-sm-block d-lg-none text-primary" v-if="user"
                          :to="{ name: 'search-partners' }">
                View Partners
              </b-nav-item>
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
    methods: {
      handleScroll() {
        this.isFloating = window.scrollY > 10
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'isAdmin'])
    },
    created() {
      const subNavbar = window.document.getElementsByClassName('.sub-navbar-holder');
      if (!subNavbar) {
        window.addEventListener('scroll', this.handleScroll);
      } else {
        this.isFloating = true;
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  }
</script>

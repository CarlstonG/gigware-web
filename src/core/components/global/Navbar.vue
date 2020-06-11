<template>
  <b-container>
    <b-navbar toggleable="lg" type="light" class="pl-0 pr-0">
      <b-navbar-toggle class="border-0 p-0" target="nav-collapse" />
      <b-navbar-brand :to="{ name: 'home' }">
        <img src="/images/logo-white.png" alt="Gigwire" />
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav
          class="ml-auto align-items-center pt-5 pt-lg-0 pb-5 pb-lg-0"
        >
          <b-nav-item :to="{name: 'faq'}">
            FAQ
          </b-nav-item>
          <b-nav-item :to="{ name: 'login' }" v-if="!isLoggedIn">Log In</b-nav-item>
          <template v-else>
            <b-nav-item class="account-phone profile-link d-lg-none"
                        v-if="userProviderProfileId"
                        :to="{ name: 'provider.profile', params: { id: userProviderProfileId } }">
              <b-avatar size="3rem" :src="userAvatarUrl"></b-avatar>
              <span>
                <strong class="username">{{user.first_name}}&nbsp;{{user.last_name}}</strong><br/>
                <span v-if="user.provider_profile" class="muted">{{user.provider_profile.company_name}}</span>
                <span v-else-if="user.customer_profile" class="muted">{{user.customer_profile.company_name}}</span>
              </span>
            </b-nav-item>
            <b-nav-item class="account-phone menu-link d-lg-none"
                        :to="{ name: isCustomer ? 'customer.settings' : 'provider.settings.basic-information' }">
                <span class="icon-card">
                  <svg-icon name="navbar_settings" width="32" class="icon-card-icon"></svg-icon>
                  <span>Settings</span>
                </span>
            </b-nav-item>
            <b-nav-item class="account-phone menu-link d-lg-none" v-if="!isCustomer"
                        :to="{ name: 'provider.settings.availability' }">
                <span class="icon-card">
                  <svg-icon name="navbar_schedule" width="32" class="icon-card-icon"></svg-icon>
                  <span>Change Availability</span>
                </span>
            </b-nav-item>
            <b-nav-item class="account-phone menu-link d-lg-none"
                        v-if="!isCustomer"
                        :to="{ name: 'provider.settings.ratings-and-reviews' }">
                <span class="icon-card">
                  <svg-icon name="navbar_send_request" width="32" class="icon-card-icon"></svg-icon>
                  <span>Send Review Request</span>
                </span>
            </b-nav-item>
            <b-nav-item @click="performLogout" class="d-lg-none">Logout</b-nav-item>

            <b-nav-item-dropdown id="login-dropdown" right no-caret menu-class="account" class="d-none d-lg-block">
              <template slot="button-content">
                <b-avatar size="4rem" :src="userAvatarUrl"></b-avatar>
              </template>
              <b-dropdown-item link-class="profile-link"
                               v-if="userProviderProfileId"
                               :to="{ name: 'provider.profile', params: { id: userProviderProfileId } }">
                <b-avatar size="4rem" :src="userAvatarUrl"></b-avatar>
                <span>
                  <strong class="username">{{user.first_name}}&nbsp;{{user.last_name}}</strong><br/>
                  <span v-if="user.provider_profile" class="muted">{{user.provider_profile.company_name}}</span>
                  <span v-else-if="user.customer_profile" class="muted">{{user.customer_profile.company_name}}</span>
                </span>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item link-class="menu-link"
                               :to="{ name: isCustomer ? 'customer.settings' : 'provider.settings.basic-information' }">
                <span class="icon-card">
                  <svg-icon name="navbar_settings" width="20" class="icon-card-icon"></svg-icon>
                  <span>Settings</span>
                </span>
              </b-dropdown-item>
              <b-dropdown-item link-class="menu-link" v-if="!isCustomer"
                               :to="{ name: 'provider.settings.availability' }">
                <span class="icon-card">
                  <svg-icon name="navbar_schedule" width="20" class="icon-card-icon"></svg-icon>
                  <span>Change Availability</span>
                </span>
              </b-dropdown-item>
              <b-dropdown-item link-class="menu-link" v-if="!isCustomer"
                               :to="{ name: 'provider.settings.ratings-and-reviews' }">
                <span class="icon-card">
                  <svg-icon name="navbar_send_request" width="20" class="icon-card-icon"></svg-icon>
                  <span>Send Review Request</span>
                </span>
              </b-dropdown-item>
              <b-dropdown-item-button @click="performLogout" block button-class="logout-button">Logout</b-dropdown-item-button>
            </b-nav-item-dropdown>
          </template>
          <b-nav-item></b-nav-item>
          <b-nav-item :to="{ name: 'register' }" v-if="!isLoggedIn">Build a profile</b-nav-item>
          <b-button
              variant="primary"
              size="lg"
              class="d-none d-lg-block ml-lg-4"
              v-if="isLoggedIn"
              :to="{ name: 'search-partners' }"
          >
            <!-- for signed in only -->
            View Partners
          </b-button>
          <b-nav-item class="mt-3 mt-lg-0 d-sm-block d-lg-none text-primary" v-if="isLoggedIn"
                      :to="{ name: 'search-partners' }">
            View Partners
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    methods: {
      ...mapActions('auth', ['logout', 'provideLoginAs']),
      performLogout() {
        this.logout().then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    },
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'user', 'userProviderProfileId', 'userAvatarUrl', 'isCustomer'])
    },
    created() {
      if (this.user?.system_role === 'admin') {
        this.provideLoginAs();
      }
    }
  }
</script>

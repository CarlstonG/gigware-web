<template>
  <div class="navbar-item-account">
    <b-nav-item v-if="isSigningIn && !user">
      <b-spinner variant="primary" />
    </b-nav-item>
    <b-nav-item :to="{ name: 'login' }" v-else-if="!authenticated">Log In</b-nav-item>
  
    <template v-else>
      <template v-if="isAdmin">
        <b-nav-item
          class="account-phone menu-link with-space d-lg-none"
          :to="{ name: 'admin.search-profiles' }"
        >
          <span class="icon-card">
            <svg-icon name="navbar_settings" width="32" class="icon-card-icon"></svg-icon>
            <span>Dashboard</span>
          </span>
        </b-nav-item>
      </template>
      <!--              not admin -->
      <template v-else>
        <b-nav-item
          class="account-phone profile-link d-lg-none"
          v-if="providerProfileId"
          :to="{ name: 'provider.profile', params: { id: providerProfileId } }"
        >
          <b-avatar size="3rem" :src="avatarUrl"></b-avatar>
          <span>
            <strong class="username">{{user.first_name}}&nbsp;{{user.last_name}}</strong>
            <br />
            <span v-if="providerProfile" class="muted">{{providerProfile.company_name}}</span>
            <span v-else-if="customerProfile" class="muted">{{customerProfile.company_name}}</span>
          </span>
        </b-nav-item>
        <b-nav-item
          class="account-phone menu-link d-lg-none"
          :to="{ name: isCustomer ? 'customer.settings' : 'provider.settings.basic-information' }"
        >
          <span class="icon-card" v-if="!user.is_verified">
            <svg-icon name="navbar_settings" width="32" class="icon-card-icon"></svg-icon>
            <span>Settings</span>
          </span>
        </b-nav-item>
        <b-nav-item
          class="account-phone menu-link d-lg-none"
          v-if="!isCustomer"
          :to="{ name: 'provider.settings.availability' }"
        >
          <span class="icon-card">
            <svg-icon name="navbar_schedule" width="32" class="icon-card-icon"></svg-icon>
            <span>Change Availability</span>
          </span>
        </b-nav-item>
        <b-nav-item
          class="account-phone menu-link d-lg-none"
          v-if="!isCustomer"
          :to="{ name: 'provider.settings.ratings-and-reviews' }"
        >
          <span class="icon-card">
            <svg-icon name="navbar_send_request" width="32" class="icon-card-icon"></svg-icon>
            <span>Send Review Request</span>
          </span>
        </b-nav-item>
      </template>
      <b-nav-item @click="performLogout" class="d-lg-none">Logout</b-nav-item>

      <b-nav-item-dropdown
        id="login-dropdown"
        right
        no-caret
        menu-class="account"
        class="d-none d-lg-block"
      >
        <template slot="button-content">
          <b-avatar size="4rem" :src="avatarUrl"></b-avatar>
        </template>
        <template v-if="isAdmin">
          <b-dropdown-item link-class="menu-link" :to="{ name: 'admin.search-profiles' }">
            <span class="icon-card">
              <svg-icon name="navbar_settings" width="20" class="icon-card-icon"></svg-icon>
              <span>Dashboard</span>
            </span>
          </b-dropdown-item>
        </template>
        <!--                not admin -->
        <template v-else>
          <b-dropdown-item
            link-class="profile-link"
            v-if="providerProfileId"
            :to="{ name: 'provider.profile', params: { id: providerProfileId } }"
          >
            <b-avatar size="4rem" :src="avatarUrl"></b-avatar>
            <span>
              <strong class="username">{{user.first_name}}&nbsp;{{user.last_name}}</strong>
              <br />
              <span v-if="providerProfile" class="muted">{{providerProfile.company_name}}</span>
              <span v-else-if="customerProfile" class="muted">{{customerProfile.company_name}}</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-divider v-if="providerProfileId" />
          <b-dropdown-item
            link-class="menu-link"
            :to="{ name: isCustomer ? 'customer.settings' : 'provider.settings.basic-information' }"
            v-if="user.is_verified"
          >
            <span class="icon-card">
              <svg-icon name="navbar_settings" width="20" class="icon-card-icon"></svg-icon>
              <span>Settings</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-item
            link-class="menu-link"
            v-if="!isCustomer"
            :to="{ name: 'provider.settings.availability' }"
          >
            <span class="icon-card">
              <svg-icon name="navbar_schedule" width="20" class="icon-card-icon"></svg-icon>
              <span>Change Availability</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-item
            link-class="menu-link"
            v-if="!isCustomer"
            :to="{ name: 'provider.settings.ratings-and-reviews' }"
          >
            <span class="icon-card">
              <svg-icon name="navbar_send_request" width="20" class="icon-card-icon"></svg-icon>
              <span>Send Review Request</span>
            </span>
          </b-dropdown-item>
        </template>

        <b-dropdown-item-button @click="performLogout" block button-class="logout-button">Logout</b-dropdown-item-button>
      </b-nav-item-dropdown>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", [
      "user",
      "avatarUrl",
      "isAdmin",
      "isProvider",
      "isCustomer",
      "customerProfile",
      "providerProfile",
      "providerProfileId",
    ]),
    authenticated() {
      return this.$auth.$vm.authenticated;
    },
    isSigningIn() {
      return this.$auth.$vm.signing_in;
    },
    tracker() {
      return JSON.parse(localStorage.getItem("tracker"));
    },
  },
  methods: {
    ...mapActions("auth", ["provideLoginAs"]),
    performLogout() {
      localStorage.setItem("tracker", null);
      this.$auth.logout();
    },
  },
  created() {
    if (this.isAdmin) {
      this.provideLoginAs();
    }
  },
};
</script>

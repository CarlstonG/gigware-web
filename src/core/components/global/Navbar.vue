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
          <b-nav-item>FAQ</b-nav-item>
          <b-nav-item>Log In</b-nav-item>
          <b-nav-item :to="{ name: 'auth' }">Build a profile</b-nav-item>
          <b-button
            variant="primary"
            size="lg"
            class="d-none d-lg-block ml-lg-4"
          >
            View Partners
          </b-button>
          <b-nav-item class="mt-5 mt-lg-0 d-sm-block d-lg-none text-primary">
            View Partners
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
  export default {}
</script>

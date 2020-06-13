<template>
  <div class="sub-navbar-holder">
    <div class="sub-navbar-wrapper">
      <b-navbar toggleable="lg" type="light" class="container">
        <b-navbar-nav class="left-side">
          <slot name="left-side"/>
        </b-navbar-nav>
        <b-navbar-nav class="right-side">
          <slot name="right-side"/>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubNavbar"
  }
</script>

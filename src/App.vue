<template>
  <router-view/>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    methods: mapActions('auth', ['checkAuth']),
    computed: mapGetters('auth', ['isLoggedIn']),
    created() {
      if (this.isLoggedIn) {
        this.checkAuth()
      }
    },
  }
</script>

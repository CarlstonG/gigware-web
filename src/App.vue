<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
  import Navbar from '@/core/components/global/Navbar'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { Navbar },
    methods: mapActions('auth', ['checkAuth']),
    computed: mapGetters('auth', ['isLoggedIn']),
    created() {
      if (this.isLoggedIn) {
        this.checkAuth()
      }
    },
  }
</script>

<template>
  <div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions('auth', ['loginAs']),
    },
    created() {
      let token = this.$route.query.token;
      if (token) {
        this.loginAs({token})
            .then(() => {
              this.$router.push({ name: 'home' })
            });
      }
    }
  }
</script>

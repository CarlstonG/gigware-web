export default {
  computed: {
    isSettingsType() {
      return this.$route.matched.some(r => r.meta.type === 'settings')
    },
  },
  methods: {
    afterSubmit() {
      // do nothing on settings pages
      if (this.isSettingsType) {
        this.$root.$bvToast.toast('Your changes have been saved.', {
          toaster: 'b-toaster-top-right',
          variant: 'primary',
        })
        return;
      }

      const nextRedirect = this.$route.matched.find(r => r.meta.nextRedirect)?.meta?.nextRedirect;
      if (nextRedirect) {
        this.$router.push(nextRedirect)
      }
    }
  }
}

<template>
  <div>
    <div class="auth">
     <!-- Calendly inline widget begin -->
      <div class="calendly-inline-widget" :data-url="url" style="min-width:320px;height:630px;"></div>
    <!-- Calendly inline widget end -->
      
    </div>
   <!-- <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"> -->
    <site-footer />
     
  </div>
  
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { mapGetters } from "vuex";

  export default {
    components: { SiteFooter },
    data() {
      return {
        url: 'https://calendly.com/gigwire/gigwire-on-boarding-interview',
        name: '',
        email: ''
      }
    },
    computed: {
      ...mapGetters("auth", ["user"]),
    },
    mounted() {
      this.name = (this.user.first_name ?? '') +' '+ (this.user.last_name ?? '')
      this.email = this.user.email
      this.url = 'https://calendly.com/gigwire/gigwire-on-boarding-interview?name=' + this.name.trim() + '&email=' + this.email.trim()
    },
  }
</script>

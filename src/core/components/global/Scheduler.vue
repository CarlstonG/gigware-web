<template>
  <div>
    <div class="auth">
     <!-- Calendly inline widget begin -->
      <div class="calendly-inline-widget" data-url="https://calendly.com/markwendelson/30min" style="min-width:320px;height:630px;"></div>
    <!-- Calendly inline widget end -->
      
    </div>
   <!-- <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"> -->
    <site-footer />
     
  </div>
  
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'

  export default {
    components: { SiteFooter },
    data() {
      return {
        
      }
    },
  }
</script>

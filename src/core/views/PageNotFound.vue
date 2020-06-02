<template>
  <div class="page-not-found">
    <b-container>
      <div class="title">
        <p>Page not Found</p>
      </div>
    </b-container>
    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'

  export default {
    components: { SiteFooter },
  }
</script>

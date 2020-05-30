<template>
  <div class="home">
    <b-container style="min-height: 50vh">
      <div class="text-block text-center">
        <div class="w-100">
          <div class="title">
            <p>Page not Found</p>
          </div>
        </div>
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

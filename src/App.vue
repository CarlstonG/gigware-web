<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
  import Navbar from '@/core/components/global/Navbar'
  export default {
    components: { Navbar },
  }
</script>

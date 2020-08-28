<template>
  <div>

    <div v-if="$auth.ready()">
      <router-view/>
      
    </div>

    <!--    show homepage until load -->
    <div v-if="!$auth.ready()">
      <navbar/>
      
      <!-- <Profile/> -->
    </div>
    
    <div class="app-loading" v-if="!$auth.ready()">
      <b-spinner variant="primary"/>
    </div>
    
  </div>
</template>
<style scoped lang="scss">
  .app-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
</style>
<script>
  import Navbar from "./core/components/global/Navbar";
  // for checking only
  //import Profile from "./modules/provider/views/Profile";

  export default {
    components: { Navbar },
    created() {
      this.$auth
        .load()
        .then(() => {
          if (this.$auth.token()) {
            this.$auth.fetch();
          }
        });
    }
    


  }
</script>

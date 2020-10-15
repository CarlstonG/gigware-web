<template>
  <div class="home client">
      <div class="container-body">
 <section id="whyUS">
  <div class="container">
    <div class="title">
      <h1 class="text-center">Become a GigWire Client </h1>
      <p class="text-center">
     <span> You Have no posted Jobs yet! Click to post your first Job.</span>  
       
      </p>
         <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Add New Job
            </b-button>
      <br>
    </div>
   
  </div>

</section>
</div>

 <!-- UI NEW IMAGE --> 

<!-- New UI photo grid -->


    <site-footer/>
  </div>
  
</template>
<style scoped lang="scss" src="./Homecard.scss"></style>
<style type="text/css">
*{
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;

}

.card-body {
     padding: 70px 0px;
}

.client .container-body {
  background: #0F4F85;
}

.text-title {
  font-weight: 600;
}
#facilities {
  background-color: #0F4F85;
  padding: 50px 0px;
}

#whyUS {
   padding: 150px 0px;
   background: white;
}
#whyUS h1 {
  font-weight: 600;
}

#facilities h1 {
  font-weight: 600;
  font-size: 34px;
  padding: 50px 0px;
  padding-top: 70px;
  color: aliceblue;
}

.title {
  text-align: center;
  padding-top: 25px 0px;
}


 #facilities .card-body {
  box-shadow: 0 0 20px 7px rgba(0, 0, 0, 0.1);
}
#facilities .card {
  margin: 20px 20px;
}

.card-body h5 {
  margin: 50px 0px;
}


#num-body .row img{
    width: 50%;
    height: 9rem;
    padding: 15px 0px;
    margin-top: -1rem;
}

.Howoverlay {
  position: relative;
  text-align: left;
}
.HowText {
  position: absolute;
  bottom: 110px;
  left: 16px;
  color: aliceblue;

  
}

.HowText h1 {
  font-weight: 800;
}
</style>
<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  //import SearchBar from "../../modules/search/components/SearchBar";

  export default {
    components: { SiteFooter },

  //  will delete sample script

  

  }
</script>

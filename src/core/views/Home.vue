<template>
  <div class="home">
    <div class="home-overlay">
      <b-row no-gutters>
      <b-col md="6">
        <div class="text-block block-text-left">
          <div class="w-100 mb-5">
            <div class="display-title">
              GigWire connects companies with talented freelance wiring professionals 
              for short and long-term hires.
        
            </div>
                 <p class="mt-3 ">Companies posting jobs on GigWire quickly find high-quality, vetted workers they can rely. Gig workers on our platform earn a great lifestyle, control over their schedule and career advancement.</p>

            <search-bar no-left-filter @onSearch="$router.push({ name: 'search-partners'})"/>
           
           
           <!-- <p class="subtitle">
              <span>Want to become a Security Partner?</span>
              <b-link :to="{ name: 'register' }">
                Build a Profile
              </b-link>
            </p> -->
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <img src="/images/home_image.png" class="" alt="Gig Wire"/>
      </b-col>
      </b-row>

     <!-- new Subhero layout -->
     

      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 col-12 col-md-offset-2 shadow">
            <div class="card bg-white text-black border-0">
              <div class="card-body">
                <h3 class="text-primary">Find Elite Wiring Talent</h3>
                <p>Learn more about how to connect with top, 
local freelance wiring talent.</p>
                <br>
                <p class="card-text text-justify"></p>
                 <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Hire Smarter
            </b-button>
              </div>

              </div>
            </div>
                  <div class="col-md-5 col-12 shadow">
            <div class="card bg-white text-black border-0 mr-2">
              <div class="card-body">
                <h3 class="text-primary">Find Great Paying Projects</h3>
                <p>Connect with ready-to-hire companies 
looking for local wiring talent..</p>
<br>
              <p class="card-text text-justify">
           
              </p>
                     <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Work Smarter
            </b-button>
              </div>

              </div>
            </div>
          </div>
        </div>
      

    </div>
     <!-- end of subhero -->
     <br>
      <div class="container  mt-5 mb-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-12 col-md-offset-2">
            <div class="card bg-white text-black border-0">
              <div class="card-body">
                 <b-img class="image-responsive" src="/images/subhomeimage2x.jpg" fluid-grow alt="Fluid-grow image"></b-img>
              </div>

              </div>
            </div>
                  <div class="col-md-5 col-12 mr-3">
            <div class="card bg-white text-left border-0">
              <div class="card-body">
                <div class="display-title">
              The Gig Economy Is Rapidly Growing
            </div>
                     <div class="subtitle">
              <span>How do we do it?</span>
              <b-link :to="{ name: 'register' }">
                Free advertising.
              </b-link>
            </div>
            <br>
            <div class="content">
              <p>
               According to Forbes, the gig economy is expanding at 3x the pace of 
              the traditional US workforce. That’s because companies are finding its 
              smart business to hire gig workers.

              </p>
              <p>
                Many workers are finding their skills are in demand if they can find 
                quality gigs. And that’s where GigWire comes in.
              </p>
            </div>
              </div>

              </div>
            </div>
          </div>
        </div>
  <br>
        <!-- UI NEW IMAGE --> 
<!-- New UI photo grid -->
<div class="row col-md-6 col-sm-1 col-lg-12">
  <div class="col"><img src="/images/gigwiretech1.png" alt="Tech Image" class="img-responsive center-block d-block mx-auto"></div>
</div>
<div class="row col-md-6 col-sm-1 col-lg-12">
    <div class="col"><img src="/images/gigwiretech2.PNG" alt="Tech Image" class="img-responsive center-block d-block mx-auto"></div>
</div>


    <br>

           <!-- new Subhero layout -->
<br>
 
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 col-12">
            <div class="card bg-white text-black border-0 shadow">
              <div class="card-body">
                 <h6 class="text-primary">CLIENTS</h6>
                <h5 class="text-primary">Find Elite Wiring Talent</h5>
              <p class="card-text text-justify">
                Become a GigWire client and expand your hiring resources. Learn more here.
              
              </p>
                 <b-button class="btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Become A Client
            </b-button>
              </div>

              </div>
            </div>
                  <div class="col-md-5 col-12">
            <div class="card bg-white text-black border-0 shadow">
              <div class="card-body">
                <h6 class="text-primary">GIG WORKERS</h6>
                <h5 class="text-primary">Find Great Paying Projects</h5>
              
              <p class="card-text text-justify">
                If you’re a wiring professional and are looking to improve your lifestyle and pay, learn more here.
           
              </p>
                     <b-button class="btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Join GigWire
            </b-button>
              </div>

              </div>
            </div>
          </div>
      
  </div>       


<br>
<br>
<!-- end of new UI photo grid -->

<!--
    <b-row class="advertise-for-free" no-gutters>
      <b-col lg="6">
        <div class="text-block block-text-left">
          <div>
            <div class="w-100">
              <div class="display-title">
                Advertise for free<br/>
                by sharing:
              </div>
              <b-row class="content">
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Your rates
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Credentials
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Team Size
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Experience
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Contact Information
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Proof of Insurance
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Location
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Referrals
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Reviews
                </b-col>
                <b-col cols="6">
                  <svg-icon name="checkmark"/>
                  Completed Jobs
                </b-col>
              </b-row>
            </div>
            <b-button class="button" :to="{ name: 'register' }" variant="primary">
              Build a Profile
            </b-button>


         



          </div>
          
        </div>
      </b-col>
      <b-col lg="6" class="col-image">
        <img :src="$screens({ default: '/images/home_adv_mobile.png', md: '/images/home_image_3.png'})"
             class="img-fluid" alt="Gig Wire"/>
      </b-col>
    </b-row> -->
    <site-footer/>
  </div>
</template>
<style scoped lang="scss" src="./Homecard.scss"></style>

<style type="text/css">




.home-overlay{
  position: relative;
}



.subcontainer .card {
  margin: 0;
}

.card-body{
  margin: 1rem;
}

.connect-your-team {
  position: relative;
  padding-top: 5rem;
  margin: 2rem;
  
}

.connect-your-team {
  align-items: center;
  justify-items: center;
  padding: 4rem;
}
.container-tech img {
  width: 58%;
  height: 55%;
  padding: 0;
  margin: 0;
}
.container-tech2 img {
    width: 58%;
  height: 55%;
  padding: 0;
  margin: 0;
  margin-left: 25rem!important;
}




</style>
<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import SearchBar from "../../modules/search/components/SearchBar";

  export default {
    components: { SearchBar, SiteFooter },

  //  will delete sample script

  

  }
</script>

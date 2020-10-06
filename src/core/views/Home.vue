<template>
  <div class="home">
    <div class="home-overlay">
      <b-row no-gutters>
      <b-col md="6">
        <div class="text-block block-text-left">
          <div class="w-100 mb-5">
            <div class="display-title">
              GigWire connects companies with talented freelance wiring professionals 
              for short and long-tem hires.
        
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
        <img src="/images/home_image.png" class="img-fluid" alt="Gig Wire"/>
      </b-col>
      </b-row>

     <!-- new Subhero layout -->
  <div class="subcontainer row rounded-top" style="text-align:left;">
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body border-0">
        <h5 class="card-title text-primary">Find Elite Wiring Talent</h5>
        <p class="card-text">Learn more about how to connect with top, 
               local freelance wiring talent.</p>
         <b-button class="btn btn-primary" :to="{ name: 'register' }" variant="primary">
              Hire Smarter
            </b-button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body border-0">
        <h5 class="card-title text-primary">Find Great Paying Projects</h5>
          <p>
                Connect with ready-to-hire companies 
                looking for local wiring talent.
             </p>
            <b-button class="btn btn-primary" :to="{ name: 'register' }" variant="primary">
              Work Smarter
            </b-button>
      </div>
    </div>
  </div>
</div>

    </div>
     <!-- end of subhero -->
     <br>
 <b-row class="connect-your-team mt-5" style="background-color: #FAFAFB" no-gutters>
      <b-col sm="6" class="col-image wire-image p-5" >
        <b-img src="/images/subhomeimage.jpg" fluid-grow alt="Fluid-grow image"></b-img>
      </b-col>
      <b-col sm="6">
        <div class="text-block block-text-right">
          <div>
            <div class="display-title">
              The Gig Economy Is Rapidly Growing
            </div>
            <div class="subtitle">
              <span>How do we do it?</span>
              <b-link :to="{ name: 'register' }">
                Free advertising.
              </b-link>
            </div>
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
      </b-col>
    </b-row>
        <!-- UI NEW IMAGE --> 
<!-- New UI photo grid -->
<div class="container-tech m-1 mt-0">
      <img src="/images/gigwiretech1.png" alt="Tech Image" class="img-responsive center-block d-block mx-auto">
   


</div>
<div class="container-tech2 m-1 mt-0">
   <img src="/images/gigwiretech2.PNG" alt="Tech Image" class="img-responsive center-block d-block mx-auto">
</div>
    <br>

           <!-- new Subhero layout -->
  <div class="submenuBtn row rounded-top" style="text-align:left;">
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body border-0">
        <h6 class="text-primary font-weight-normal">CLIENTS</h6>
        <h5 class="card-title text-primary">Find Elite Wiring Talent</h5>
        <p class="card-text">Become a GigWire client and expand your hiring resources. Learn more here.</p>
         <b-button class="btn-primary" :to="{ name: 'register' }" variant="primary">
              Become A Client
            </b-button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body border-0">
        <h6 class="text-primary font-weight-normal">GIG WORKERS</h6>
        <h5 class="card-title text-primary">Find Great Paying Projects</h5>
          <p class="card-text">
                If you’re a wiring professional and are looking to 
improve your lifestyle and pay, learn more here.
             </p>
            <b-button class="btn-primary" :to="{ name: 'register' }" variant="primary">
              Join GigWire
            </b-button>
      </div>
    </div>
  </div>
</div>
        
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



.subcontainer {
   padding: 1px 25rem!important;
   padding-left: 5rem;
   height: 250px;
   width: 100%;
  position: absolute;
  top: 97%;
  left: 50%;
  transform: translate(-50%, -50%);

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
  margin-left: 25                rem!important;
}

.submenuBtn {
  background-color: #ecf2f7;
  justify-items: center;
  align-items: center;
  margin: auto 20rem;
  padding: 5rem 25rem;
  overflow: hidden;
}

.submenuBtn .card {
  margin: 2rem 0.1rem;
  border: 1px solid whitesmoke;
  background-color: rgb(255, 254, 254);
  padding: 0;
  -webkit-box-shadow: -1px 2px 5px 0px rgba(0,0,0,0.55);
-moz-box-shadow: -1px 2px 5px 0px rgba(0,0,0,0.55);
box-shadow: -1px 2px 5px 0px rgba(0,0,0,0.55);
}

@media screen and (max-width: 600px) {
  .subcontainer {
    visibility: hidden;
    clear: both;
    float: left;
    margin: 10px auto 5px 20px;
    width: 28%;
    display: none;
  }
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

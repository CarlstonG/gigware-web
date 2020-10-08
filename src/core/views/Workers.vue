<template>
  <div class="home">
    <div class="home-overlay">
      <b-row no-gutters class="p-0 m-0">
      <b-col md="6">
        <div class="text-block block-text-left">
          <div class="w-100 mb-5">
            <div class="display-title">
             <h1 class="text-title p-0 mt-0 mb-1">
                Enjoy The Gig Lifestyle
            </h1> 
                <p class="mt-3 pr-5 pb-3">Gig work is one of the fastest growing changes in the 
                    American workforce.</p>
                    

                <p class="mt-1 pr-5">
                    One in three professionals reports having added extra income 
                    to their lifestyle with gig work and 78% of gig workers say they 
                    are more satisfied with the benefits of the lifestyle.
                </p>
              <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Get Started Now
            </b-button>
            </div>

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
          <div class="workerhero">
                        <img src="/images/workers/workerHero.jpg" class="img-fluid" alt="Gig Wire"/>
          </div>
      </b-col>
      </b-row>



    </div>
     <br>
     <br>
     <br>
 <!-- UI NEW IMAGE --> 
       <div class="container">
    
        <div class="row justify-content-center">
          <div class="col-lg-6 col-12 col-md-offset-2">
            <div class="card bg-white text-black border-0">
              <div class="card-body">
                 <b-img class="image-responsive fit-image" src="/images/workers/herograph.jpg" fluid-grow alt="Fluid-grow image"></b-img>
              </div>

              </div>
            </div>
                  <div class="col-lg-6 col-12 col-md-offset-2">
                  <div class="display-title">
                    <h1 class="text-title">Earn a High GigWire Rating and</h1>
                    <h1 class="text-title">Get Top Paying Projects</h1>
                    <br>
                    <br>
                  </div>
                  <div class="card-body">
                      <div class="row">
                        <div class="col-sm-2">
                            <b-img class="image-responsive fit-image" src="/images/workers/BadgeB.png" fluid-grow alt="Fluid-grow image"></b-img>
                        </div>
                        <div class="col">
                          <h4><strong>B Players | GigWire Score: 80-89.9%</strong></h4>
                          <p>Secure your Vetted badge as a B Player and start your way into building credibility and getting projects on the platform.</p>
                        </div>
                      </div>
                              <div class="row">
                        <div class="col-sm-2">
                            <b-img class="image-responsive fit-image" src="/images/workers/BadgeA.png" fluid-grow alt="Fluid-grow image"></b-img>
                        </div>
                        <div class="col">
                          <h4><strong>A Players | GigWire Score: 90-96.0%</strong></h4>
                          <p>GigWire awards the A Player distinction to serious service providers. This proficiency badge helps you land higher paying projects on GigWire.</p>
                        </div>
                      </div>
                              <div class="row">
                        <div class="col-sm-2">
                            <b-img class="image-responsive fit-image" src="/images/workers/BadgeC.png" fluid-grow alt="Fluid-grow image"></b-img>
                        </div>
                        <div class="col">
                          <h4><strong>Top 3% | GigWire Score: 97-100%</strong></h4>
                          <p>Earn your 3% badge to stand out and connect with top companies on GigWire.</p>
                        </div>
                      </div>
                  </div>
                  </div>
          </div>
        </div>
    <br>    
<!-- New UI photo grid -->
<section id="facilities">
  <div class="container">
    <div class="title">
      <h1 class="text-center">Why Work on the GigWire Platform</h1>
      <br>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card text-center">
             
             <div class="card-body">
              <img class="mx-auto d-block" src="/images/workers/Money.png" width="40" height="40" />

                 <h5 class="card-title">Higher Pay</h5>
                
              
               
               <p class="card-text">Unlike temp agencies or platforms the take fees, GigWire charges an affordable subscription fee. This means there is not huge agent fee or commission that gets taken out of the labor cost the project pays. </p>
             </div>
        </div>
      </div>
            <div class="col-md-4">
            <div class="card text-center">
             
             <div class="card-body">
                    <img class="mx-auto d-block" src="/images/workers/Work.png" width="40" height="40" />
                 <h5 class="card-title">Personal Development</h5>
                
              
               
               <p class="card-text">Working with GigWire you will rapidly gain experience working on local projects and with different technologies and crews. This builds experience and career development and the value you can demand for your services.</p>
             </div>
        </div>
      </div>
            <div class="col-md-4">
            <div class="card text-center">
             
             <div class="card-body">
                  <img class="mx-auto d-block" src="/images/workers/Build.png" width="40" height="40"  />
                 <h5 class="card-title">Career Progression</h5>
                
              
               
               <p class="card-text">As you complete projects on GigWire clients will give you favorable reviews. Great reviews makes it easier to pick up higher paying projects and advance your career. Join Gigwire now and improve your career.</p>
             </div>
        </div>
      </div>
    </div>
  </div>

</section>
<section id="whyUS">
  <div class="container">
    <div class="title">
      <h1 class="text-center">Become a GigWire Worker</h1>
      <p class="text-center">
        Sign up for GigWire and start enjoying the gig lifestyle today.

      </p>
         <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Sign Up For GigWire
            </b-button>
      <br>
    </div>
   
  </div>

</section>
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

.text-title {
  font-weight: 600;
}
#facilities {
  background-color: #0F4F85;
  padding: 50px 0px;
}

#whyUS {
   padding: 150px 0px;
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


</style>
<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import SearchBar from "../../modules/search/components/SearchBar";

  export default {
    components: { SearchBar, SiteFooter },

  //  will delete sample script

  

  }
</script>

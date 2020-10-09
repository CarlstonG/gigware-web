<template>
  <div class="home client">
      <div class="container-body">
      <b-row no-gutters class="p-0 m-0">
    
      <b-col md="6">
        <div class="text-block block-text-left">
          <div class="w-100 mb-5">
            <div class="display-title">
             <h1 class="text-title text-white p-0 mt-0 mb-1">
                The New Way To Hire for Wiring
            </h1> 
                <p class="text-white mt-3 pr-5 pb-3">GigWire provides companies with access to workers that are 
                    extensively vetted with background checks, work history, safety 
                    records and skills. 
                </p>
                    

                <p class="text-white mt-1 pr-5">
                    We work from a subscription basis versus charging large fees 
                    and commissions. We’re more affordable than temp agencies 
                    and easier to work with than other platforms.
                </p>
                <br>
              <b-button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">
              Get Started Now
            </b-button>
            </div>

          </div>
        </div>
      </b-col>
      
      <b-col md="6">
          <div class="client">
                        <img src="/images/workers/clients.jpg" class="img-fluid" alt="Gig Wire"/>
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
                 <b-img class="image-responsive fit-image" src="/images/workers/Affordable.png" fluid-grow alt="Fluid-grow image"></b-img>
              </div>

              </div>
            </div>
                  <div class="col-lg-6 col-12 col-md-offset-2">
                  <div class="display-title">
                    
                    <br>
                    <br>
                  </div>
                  <div class="card-body">
                      <div class="row">
                 
                        <div class="col">
                            <h1 class="text-title">GigWire is Affordable</h1>
                      
                            <p>
                                GigWire works on a subscription model that starts at $9.99 a month. The first three months are free to try out the platform so it’s a risk free on your part.
                            </p>
                      <button class="btn btn-primary btn-lg" :to="{ name: 'register' }" variant="primary">Start Your 3 Month Free Trial</button>
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
  //import SearchBar from "../../modules/search/components/SearchBar";

  export default {
    components: { SiteFooter },

  //  will delete sample script

  

  }
</script>

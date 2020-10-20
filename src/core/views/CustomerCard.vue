<template>

    <b-form @submit.prevent="submit">
      <b-row>
        <b-col lg="6" class="col-left">
          <validated-b-form-group
              name="first_name"
              label="First Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.first_name"
                          :placeholder="placeholders.first_name"/>
            <verification-message name="first_name" alias="last_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="last_name"
              label="Last Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.last_name"
                          :placeholder="placeholders.last_name"/>
            <verification-message  name="last_name" alias="first_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="phone_number"
              label="Phone Number"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.phone_number"
                          :placeholder="placeholders.phone_number"
                          v-on:keyup="formatPhoneNumber()"
                          maxlength="10"/>
          </validated-b-form-group>
          <!--set company name to not required -->
          <validated-b-form-group
              name="company_name"
              label="Company Name"
              :disabled="formLocked"
              class=" "
          >
            <b-form-input v-model.trim.lazy="form.company_name"
                          :placeholder="placeholders.company_name"/>
            <verification-message v-if="user.provider_profile"
                                  :value="user.provider_profile.verification"
                                  name="company_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="team_size"
              label="Team Size"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input class="w-25" v-model.trim.lazy="form.team_size"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="description"
              label="About You - show your customers you're a good fit by telling them about yourself"
              :disabled="formLocked"
              class="required"
          >
            <b-form-textarea v-model.trim.lazy="form.description" rows="5"
                             :placeholder="placeholders.about_us"/>
          </validated-b-form-group>
        </b-col>
        <b-col lg="6" class="col-right">
          <validated-b-form-group
              name="profile_image"
              label="Upload Profile Image"
              :disabled="formLocked"
              class=""
          >
            <file-upload v-model="form.profile_image"
                          ref="fileUpload"
                          :file-src="avatarUrl"
                          :cropperImageStyle="{ 'object-fit': 'contain', 'max-height': '30vh' }"
                          :cropperAspectRatio="1"
                          :tips="{
                            'no-image': 'Customers prefer clear photos with a smiling face',
                            'uploaded': 'Drag the frame to adjust image'
                          }"
            />
            <verification-message :value="avatarModel.verification"/>
          <!-- Added video link function on registration -->
      <div id="Vid" class="mt-1">
         <button type="button" class="btn btn-primary mb-2" @click="showAddModal=true">
        <i class="fab fa-youtube"> Share Video Link</i>
      </button>

      <!-- video pop model -->
      <div id="overlay" v-if="showAddModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                New Video Link
              </h5>
              <button type="button" class="close" @click="showAddModal=false">
                <span aria-hidden="true">&times;</span>
              </button>
                  
            </div>
            <div class="modal-body p-4">
              <form action="#" 
              method="post">
                  <div class="form-group">
                    <input type="text" name="name" class="form-control
                    form-control-lg" 
                     id="name-input"
                    v-model="name"
                    :state="nameState"
                    required
                            placeholder="Video Link">
                  </div>


                  <!-- BUG ON UPLOAD SHARE -->
                  
                  <div class="form-group">
                    <button class="btn btn-info btn-block btn-lg"
                        id="modal-prevent-closing"
                        ref="modal"
                        title="Submit Your Name"
                        @show="resetModal"
                        @hidden="resetModal"
                        @ok="handleOk"
                                      
                    >
                    Share your link!
                    </button>
                  </div>
                  <div class="container">
                    <div class="col text-center">
                      <div class="col-lg-12">
                        <h3 class="center text-info">Your Links!</h3>
                      </div>
                      <hr>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <table class="table table-bordered table-striped">
                          <thead>
                            <tr class="text-center bg-info text-light">
                               
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="text-center">
                              <td v-for="name in submittedNames" v-bind:key="name">{{ name }}</td>
                              <td><a href="#" class="text-success"><i class="fas fa-edit">
                                </i></a></td>
                              <td><a href="#" class="text-danger"><i class="fas fa-trash">
                                </i></a></td>  
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
        <!-- End of Added video link function on registration -->
      <hr>

         
         
          </validated-b-form-group>
        </b-col>
      </b-row>
      <steps-footer :loading="formLocked" :state="formState"/>
    </b-form>
 
</template>
<style scoped lang="scss" src="./BasicInformation.scss"></style>
<style type="text/css">
  #overlay{
    margin-top: 5rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
</style>

<script>
  //import validations from '@/modules/provider/services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import FileUpload from '@/core/components/file/FileUpload'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import {  mapGetters } from 'vuex'
  import VerificationMessage from "@/core/components/forms/VerificationMessage";
  //import { avatarCroppedBlobOptions } from "@/core/constants/cropped-blob-options";
  //import axios from 'axios'


  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { VerificationMessage, FileUpload, StepsFooter },
    data: () => ({
      // START OF VID BLOB
     link: '',
        nameState: null,
        submittedLinks: [],
        termsAndConds: false,
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
      // END OF VID DATA BLOB
      form: {
        first_name: '',
        last_name: '',
        phone_number: '',
        company_name: '',
        team_size: 0,
        description: '',
        profile_image: null,
      },
      placeholders: placeholders,
    }),
   
    computed: {
      ...mapGetters('auth', ['user', 'avatarUrl']),
      avatarModel() {
        return this.user.images?.data?.length ? this.user.images.data[this.user.images.data.length - 1] : { verification: {} }
      }
    },
   

  }
</script>

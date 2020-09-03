<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p class="mb-5">Log in and get more Gigs.</p>
        <validated-b-form-wrapper :validator="$v.form">
          <b-form @submit.prevent="submit">
            <validated-b-form-group
                name="email"
                label="Email"
                :disabled="formLocked"
            >
              <b-form-input v-model.trim.lazy="form.email"/>
            </validated-b-form-group>
            <validated-b-form-group
                name="password"
                label="Password"
                :disabled="formLocked"
            >
              <b-form-input v-model.trim.lazy="form.password" type="password"/>
            </validated-b-form-group>
            
            <!-- added phone number on login --> 
            

            <validated-b-form-group
              name="phone_number"
              label="Phone Number"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.phone_number"
                          
                          v-on:keyup="formatPhoneNumber()"
                          maxlength="10"/>
          </validated-b-form-group>




            <div class="d-flex justify-content-between">
              <b-form-checkbox v-model="form.remember_me">
                Keep me logged in
              </b-form-checkbox>
              <b-link :to="{ name: 'forgot' }">Forgot password?</b-link>
            </div>
            <b-form-row class="justify-content-end mt-5">
              <b-progress-button
                  size="lg"
                  :disabled="formLocked"
                  :state="formState"
                  default-text="Submit"
              />
            </b-form-row>
          </b-form>
        </validated-b-form-wrapper>
        <div class="mt-5">
          Don't have an account?
          <b-link :to="{ name: 'register' }">Join</b-link>
          Gig Wire.
        </div>
      </div>
    </div>
    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import validations from '../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions } from 'vuex'
  
  //added placeholder on imports
 // import placeholders from '@/core/constants/placeholders'


  // import User from "@/core/classes/user";

  export default {
    components: { SiteFooter },
    mixins: [validateFormMixin],
    data: () => ({
      form: {
        email: '',
        password: '',
        phone_number: '',
        remember_me: false,
      },
    }),

        // added phone number on async
      formatPhoneNumber() {
        let x = this.form.phone_number;
        return this.form.phone_number = x.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/,'($1)-$2-$3');
      },




    validations: validations.login,
    methods: {
      ...mapActions('auth', ['login']),
      sendRequest() {
        return this.$auth
          .login({
            data: {
              email: this.form.email,
              password: this.form.password,
              remember_me: this.form.remember_me
            },
            staySignedIn: this.form.remember_me,
            fetchUser: false,
            redirect: null
          })
          .then(() => {
            if (this.form.remember) {
              this.$auth.remember(JSON.stringify({
                name: this.$auth.user().first_name
              }));
            } else {
              this.$auth.unremember();
            }

            return this.$auth.fetch().then(({ data }) => {
              // redirect
              const user = data;

              if (user?.system_role === 'admin') {
                this.$router.replace({ name: 'admin.search-profiles' })
                return;
              }

              const isRegistered = user?.provider_profile?.is_registered;
              const roleSlug = user?.role?.slug;
              const providerProfileId = user?.provider_profile?.id;
              if (isRegistered && providerProfileId) {
                this.$router.replace({ name: 'provider.profile', params: { id: providerProfileId } }); // todo: implement routes history ignoring and send before login
              } else if (!isRegistered && roleSlug === 'provider') {
                this.$router.replace({ name: 'provider.onboarding.basic-information' });
              } else if (this.$route.name !== 'home') {
                this.$router.replace({ name: 'home' })
              }
            }).catch((error) => {
              this.serverError = error;

              if (this.statusCode === 401) {
                this.toast('Authentication is failed.')
              } else {
                console.error('user fetch error:', error)

                this.$auth.logout({ redirect: this.$route.path }); // logout if there is error on user fetching
                this.handleServerError(error);
              }
            })
          })
          .catch(error => {
            this.serverError = error;

            if (this.statusCode === 401) {
              this.toast('Authentication is failed. Please check your credentials')
            } else {
              this.handleServerError(error);
            }
          })
      },
    }
  }
</script>

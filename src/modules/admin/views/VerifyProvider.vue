<template>
  <div class="verify-provider">
    <validated-b-form-wrapper :validator="$v.form">
      <b-form @submit.prevent="submit">
        <sub-navbar>
          <template v-slot:left-side>
            <b-nav-text>
              Admin verify Account
            </b-nav-text>
          </template>
          <template v-slot:right-side>
            <div v-if="form && form.user && form.user.deleted_at" class="ml-2 mr-2 p-1 bg-danger">
              Account deactivated
            </div>
            <b-progress-button
                    variant="light"
                    @click="deleteUserRequest()"
                    v-if="form && form.user"
                    :disabled="formLocked"
                    :state="deleteState"
                    type="button"
                    :default-text="(form.user.deleted_at) ? 'Activate account' : 'Deactivate account'"
            />
            <b-progress-button
                :disabled="formLocked"
                :state="formState"
                default-text="Save Changes"
            />
          </template>
        </sub-navbar>
        <b-container fluid="sm" class="verify-provider-container">
          <div class="page content" v-if="!isLoading && profile">
            <section>
              <div class="icon-card">
                <div class="icon-card-icon">
                  <validated-b-form-group
                      name="user.avatar.verification.is_accepted"
                      :show-error-message="false"
                      :disabled="formLocked"
                  >
                    <verify-input column v-if="profileAvatarUrl" v-model="form.user.avatar.verification">
                      <b-avatar
                          :src="profileAvatarUrl"
                          :size="$screens({ default: '75', md: '125', xl: '200' })"
                      />
                    </verify-input>
                    <b-avatar v-else src="" :size="$screens({ default: '75', md: '125', xl: '200' })"/>
                  </validated-b-form-group>
                </div>
                <div class="profile-data">
                  <h2 class="company-title title">
                    <validated-b-form-group
                        name="verification.details.company_name.is_accepted"
                        :show-error-message="false"
                        :disabled="formLocked"
                    >
                      <verify-input v-model="form.verification.details.company_name">
                        {{ profile.company_name }}
                      </verify-input>
                    </validated-b-form-group>
                  </h2>
                  <validated-b-form-group
                      name="user.verification.details.first_name.is_accepted"
                      :show-error-message="false"
                      :disabled="formLocked"
                  >
                    <div class="icon-card">
                      <svg-icon name="icon_team_lead" class="icon-card-icon"/>
                      <span class="label">
                      <verify-input v-model="form.user.verification.details.full_name">
                        {{ profile.user.first_name }} {{ profile.user.last_name }}
                      </verify-input>
                    </span>
                    </div>
                  </validated-b-form-group>
                  <div class="icon-card" v-if="profile.address">
                    <svg-icon name="icon_location" class="icon-card-icon"/>
                    <div>
                      <span class="label">{{ profile.address.street_address }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section v-if="profile.certificates.data.length">
              <hr>

              <h2 class="title">Verify Licenses,Certifications or Training</h2>

              <div v-for="(item, index) in profile.certificates.data" :key="item.id">
                <div class="certificates">
                  <div class="certificate-title" v-if="item.images.data.length">
                    {{item.team_members_count}} / {{profile.team_size}} team members hold {{item.name}} license
                  </div>
                  <div class="certificate-title" v-else>
                    <validated-b-form-group
                        :name="'certificates.' + index + '.verification.is_accepted'"
                        :show-error-message="false"
                        :disabled="formLocked"
                    >
                      <verify-input v-model="form.certificates[index].verification">
                        {{item.team_members_count}} / {{profile.team_size}} team members hold {{item.name}} license
                      </verify-input>
                    </validated-b-form-group>
                  </div>

                  <div class="certificate-images">
                    <validated-b-form-group
                        v-for="(img, imgIndex) in item.images.data" :key="img.id"
                        :name="'certificates.' + index + '.images.' + imgIndex + '.verification.is_accepted'"
                        :show-error-message="false"
                        :disabled="formLocked"
                    >
                      <verify-input column v-model="form.certificates[index].images[imgIndex].verification">
                        <div class="img-wrapper"
                             @click="showImg(img)"
                             :style="img.url | bgImage"/>
                      </verify-input>
                    </validated-b-form-group>
                  </div>
                </div>
              </div>
            </section>

            <section v-if="profile.insurance">
              <hr>

              <h2 class="title">Verify Proof of Insurance</h2>

              <div class="certificate-images">
                <validated-b-form-group
                    name="insurance.verification.is_accepted"
                    :show-error-message="false"
                    :disabled="formLocked"
                >
                  <verify-input column v-model="form.insurance.verification">
                    <div class="img-wrapper"
                         @click="showImg(insuranceImage)"
                         :style="insuranceImage.url | bgImage"/>
                  </verify-input>
                </validated-b-form-group>
              </div>
            </section>

          </div>
        </b-container>

        <image-popup :value="imagePopupData"/>
      </b-form>
    </validated-b-form-wrapper>
    <site-footer/>

  </div>
</template>
<style scoped lang="scss" src="./VerifyProvider.scss"></style>

<script>
  import SubNavbar from "../components/SubNavbar";
  import SiteFooter from '@/core/components/global/Footer'
  import { mapActions, mapGetters, mapState } from "vuex";
  import VerifyInput from "../components/VerifyInput";
  import ImagePopup from "../components/ImagePopup";
  import validateFormMixin from '@/core/mixins/validate-form-mixin'

  export default {
    mixins: [validateFormMixin],
    data: () => ({
      imagePopupData: null,
      form: {},
      deleteState: 'default'
    }),
    validations: { form: {} },
    components: { ImagePopup, VerifyInput, SubNavbar, SiteFooter },
    computed: {
      ...mapState('provider', ['provider_profile']),
      ...mapGetters('provider', ['isLoading', 'profileAvatarUrl', 'profileAvailabilityDates', 'profileExternalReviewsCount', 'profileExternalReviewsAverage']),
      profile() {
        return this.provider_profile
      },
      insuranceImage() {
        return this.profile?.insurance?.image || {};
      }
    },
    methods: {
      ...mapActions('provider', ['profileRequest']),
      ...mapActions('admin/verifyProviderProfile', ['submitVerification', 'deleteUser']),
      showImg(img) {
        this.imagePopupData = JSON.parse(JSON.stringify(img));
      },
      deleteUserRequest() {
        this.deleteState = 'loading';
        this.deleteUser({
          id: this.form?.user?.id,
          action: (this.form?.user?.deleted_at) ? 'on' : 'off'
        }).then(() => {
          this.deleteState = 'default';
          this.form.user.deleted_at = this.form.user.deleted_at ? null : true;
        }).catch(() => {
          this.deleteState = 'default';
        })
      },
      sendRequest() {
        return this.submitVerification(this.form)
          .then(data => {
            if (!data.is_verified) {
              this.$root.$bvToast.toast('The user has been updated his profile while you has been verifying it. Please verify this profile again.', {
                toaster: 'b-toaster-top-right',
                variant: 'danger',
              })
              this.loadProfileData();
            } else {
              this.$root.$bvToast.toast('The profile has been verified', {
                toaster: 'b-toaster-top-right',
                variant: 'primary',
              })
            }
          });
      },
      makeVerification(verification, parent, details) {
        if (!verification) verification = {};

        const tmp = {
          is_accepted: null,
          reason: null,
        };

        const result = Object.assign(tmp, verification);
        if (details || verification.details) {
          result.details = Object.assign(details || {}, verification.details || {});
        }

        if (parent) {
          result.verifiable_id = verification.verifiable_id || parent.verifiable_id;
          result.verifiable_type = verification.verifiable_type || parent.verifiable_type;
        }

        return result;
      },
      initForm(data) {
        if (data.user?.verification?.details?.first_name) {
          const fa = data.user.verification.details.first_name.is_accepted;
          const la = data.user.verification.details.last_name.is_accepted;
          data.user.verification.details.full_name = {
            is_accepted: fa === null || la === null ? null : fa && la,
            reason: data.user.verification.details.first_name.reason
          }

          delete data.user.verification.details.first_name;
          delete data.user.verification.details.last_name;
        }

        this.form = {
          verification: this.makeVerification(data.verification,
            {
              verifiable_id: data.id,
              verifiable_type: 'provider_profile'
            }, { 'company_name': this.makeVerification() }),
          user: {
            verification: this.makeVerification(data.user.verification,
              { verifiable_id: data.user.id, verifiable_type: 'user' }, { 'full_name': this.makeVerification() }),
            avatar: {
              verification: data.user?.images?.data?.length ?
                this.makeVerification(
                  data.user.images.data[data.user.images.data.length - 1].verification, {
                    verifiable_id: data.user.images.data[data.user.images.data.length - 1].id,
                    verifiable_type: 'image'
                  }
                )
                : this.makeVerification()
            },
            deleted_at: data.user?.deleted_at,
            id: data.user?.id
          },
          certificates: data.certificates?.data?.length ? data.certificates.data.map(cert => ({
            verification: this.makeVerification(cert.verification, {
              verifiable_id: cert.id,
              verifiable_type: 'provider_certificate'
            }),
            images: cert.images?.data?.length ?
              cert.images?.data?.map(item => ({
                verification: this.makeVerification(item.verification, {
                  verifiable_id: item.id, verifiable_type: 'image'
                })
              }))
              : null
          })) : [],
          insurance: data.insurance ? {
            verification: this.makeVerification(data.insurance?.verification, {
              verifiable_id: data.insurance.id, verifiable_type: 'provider_insurance'
            })
          } : null,
        }
      },
      loadProfileData() {
        this.formState = 'loading';

        this.profileRequest(this.$route.params.id)
          .then(data => {
            this.initForm(data);
          })
          .catch(error => {
            this.serverError = error;

            if (this.statusCode === 404) {
              this.$router.push({ name: '404' })
            } else {
              this.handleServerError(error)
            }
          })
          .finally(() => this.formState = 'default');
      },
    },
    created() {
      this.loadProfileData();
    }
  }
</script>

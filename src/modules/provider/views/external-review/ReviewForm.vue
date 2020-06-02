<template>
  <div>
    <div class="token-checking" v-if="tokenChecking">
      <b-spinner variant="primary" type="grow"></b-spinner>
      <b-spinner variant="primary" type="grow"></b-spinner>
      <b-spinner variant="primary" type="grow"></b-spinner>
    </div>
    <div class="token-used" v-if="tokenUsed">
      You already left a review for this Provider
    </div>
    <div v-if="token">
      <h2 class="title">Leave a Review for {{ profile.company_name }}</h2>
      <validated-b-form-wrapper :validator="$v.form">
        <b-form @submit.prevent="submit">
          <validated-b-form-group
              name="first_name"
              label="First Name"
              :disabled="formLocked"
              class="required"
          >
            <b-form-input v-model.trim.lazy="form.first_name"/>
          </validated-b-form-group>
          <validated-b-form-group
              name="last_name"
              label="Last Name"
              :disabled="formLocked"
              class=""
          >
            <b-form-input v-model.trim.lazy="form.last_name"/>
          </validated-b-form-group>
          <b-row>
            <b-col cols="6">
              <validated-b-form-group
                  name="rating"
                  label="Please Rate"
                  :disabled="formLocked"
                  :messages="{ between: 'Please set the Rating' }"
                  class="required"
              >
                <b-form-rating variant="warning" v-model.lazy="form.rating"></b-form-rating>
              </validated-b-form-group>
            </b-col>
          </b-row>

          <validated-b-form-group
              name="review"
              label="Place for your review"
              :disabled="formLocked"
              class="required"
          >
            <b-form-textarea v-model.trim.lazy="form.review" rows="5"
                             placeholder="Describe props and cons of your experience"/>
          </validated-b-form-group>

          <div class="mt-5 d-flex justify-content-end">
            <b-progress-button
                size="lg"
                :disabled="formLocked"
                :state="formState"
                default-text="Submit"
                loading-text="Loading..."
            />
          </div>
        </b-form>
      </validated-b-form-wrapper>
    </div>
  </div>
</template>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import { mapActions } from 'vuex'

  export default {
    mixins: [validateFormMixin],
    data: () => ({
      form: {
        first_name: '',
        last_name: '',
        rating: 0,
        review: '',
      },
      token: null,
      tokenChecking: false,
      tokenUsed: false,
      profile: {},
    }),
    validations: validations.externalReview,
    methods: {
      ...mapActions('provider', ['checkExternalReviewToken', 'sendExternalReview']),
      sendRequest() {
        return this.sendExternalReview({ token: this.token, form: this.form })
          .then(() => {
            this.$emit('reviewSent', this.profile);
          })
      },
      formData() {
        let formData = new FormData()
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('rating', this.form.rating)
        formData.append('review', this.form.review)

        return formData
      }
    },
    created() {
      const token = this.$route.params.token;
      if (token) {
        this.tokenChecking = true;
        return this.checkExternalReviewToken(token)
          .then((data) => {
            this.profile = data;
            this.token = token;
          })
          .catch((err) => {
            this.serverError = err;

            if (this.statusCode === 403) {
              this.tokenUsed = true;
            } else if (this.statusCode === 404) {
              this.$router.push({ name: '404' })
            } else {
              this.handleServerError(err)
            }
          })
          .finally(() => {
            this.tokenChecking = false;
          })
      }
    }
  }
</script>

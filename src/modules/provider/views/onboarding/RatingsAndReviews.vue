<template>
  <div>
    <validated-b-form-wrapper :validator="$v.form">
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col lg="6" class="col-left">
            <validated-b-form-group
                :name="`emails.$each.${index}.email`"
                :label="index === 0 ? 'Email address of your former customer:' : ''"
                :disabled="formLocked"
                v-for="(current, index) in form.emails"
                :key="index"
            >
              <b-form-input v-model.trim.lazy="current.email"/>
            </validated-b-form-group>
            <b-button variant="transparent"
                      size="lg"
                      @click="addEmail"
                      class="add-button"
                      :disabled="formLocked">
              <span class="plus"></span> Add New Email
            </b-button>
            <div class="text-right">
              <b-progress-button
                  class="send-request-btn"
                  size="sm"
                  :disabled="formLocked"
                  :state="formState"
                  @click="sendReviewRequest"
                  default-text="Send Request"
                  loading-text="Sending...">
              </b-progress-button>
            </div>
          </b-col>
          <b-col lg="6" class="col-right">
            <validated-b-form-group
                name="email_template"
                label="Email template:"
                :disabled="formLocked"
            >
              <b-form-textarea
                  v-model.trim.lazy="form.email_template"
                  rows="9"
              />
            </validated-b-form-group>
          </b-col>
        </b-row>
        <steps-footer
            :loading="formLocked"
            :state="formState"
            @skip="goToNextStep"
            @click="goToNextStep"
        />
      </b-form>
    </validated-b-form-wrapper>
  </div>
</template>
<style scoped lang="scss" src="./RatingsAndReviews.scss"></style>

<script>
  import validations from '../../services/validations'
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions } from 'vuex'

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { StepsFooter },
    data: () => ({
      form: {
        emails: [{ email: '' }],
        email_template:
          'Thanks for being a great customer! I am now signed up for Gig Wire to connect with more awesome cabling install customers like you. Reviews are very important to improving my profile. If you don’t mind, could you take a second to write a few sentences about working with me? I would really appreciate my future customers hearing about your experience.\n\nThank you!',
      },
    }),
    validations: validations.onboarding.ratingsAndReviews,
    methods: {
      ...mapActions('provider', ['createReviewRequest']),
      sendReviewRequest() {
        this.validate(() => {
          this.createReviewRequest(this.prepareData())
            .then(() => {
              this.$root.$bvToast.toast('Your request has been sent.', {
                toaster: 'b-toaster-top-right',
                variant: 'primary',
              })
            })
            .catch(error => {
              this.handleServerError(error)
            })
            .finally(() => {
              this.setDefaultState()
            })
        });
      },
      sendRequest() {
        return Promise.resolve().then(() => {
          this.afterSubmit()
        })
      },
      prepareData() {
        let data = { email_template: this.form.email_template, emails: [] }
        this.form.emails.forEach(current => {
          data.emails.push(current.email)
        })
        return data
      },
      addEmail() {
        this.form.emails.push({ email: '' })
      },
    },
  }
</script>

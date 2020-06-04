<template>
  <div>
    <validated-b-form-wrapper :validator="$v.form">
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col lg="6" class="pr-5">
            <validated-b-form-group
                :name="`emails.$each.${index}.email`"
                :label="index === 0 ? 'Email address of your former customer:' : ''"
                :disabled="formLocked"
                v-for="(current, index) in form.emails"
                :key="index"
            >
              <b-form-input v-model.trim.lazy="current.email"/>
            </validated-b-form-group>
            <b-link @click="addEmail">+ Add New Email</b-link>
          </b-col>
          <b-col lg="6" class="pl-5">
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
            :optional="true"
            @skip="goToNextStep"
        />
      </b-form>
    </validated-b-form-wrapper>
  </div>
</template>

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
      sendRequest() {
        return this.createReviewRequest(this.prepareData()).then(() => {
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

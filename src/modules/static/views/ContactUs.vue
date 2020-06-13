<template>
  <div class="contact-us">
    <b-container class="page">
      <b-row>
        <b-col lg="7" offset-xl="1">
          <div>
            <div class="message-sent" v-if="requestHasBeenSent">
              Your message has been sent.
            </div>
            <div v-else>
              <h2 class="title">Have a question or concern? Let us know.</h2>
              <b-row>
                <b-col cols="12" md="7">
                  <validated-b-form-wrapper :validator="$v.form">
                    <b-form @submit.prevent="submit">
                      <validated-b-form-group
                          name="first_name"
                          label="First Name"
                          :disabled="formLocked"
                          class="required"
                      >
                        <b-form-input v-model.trim.lazy="form.first_name"
                                      :placeholder="placeholders.first_name"/>
                      </validated-b-form-group>
                      <validated-b-form-group
                          name="last_name"
                          label="Last Name"
                          :disabled="formLocked"
                          class="required"
                      >
                        <b-form-input v-model.trim.lazy="form.last_name"
                                      :placeholder="placeholders.last_name"/>
                      </validated-b-form-group>
                      <validated-b-form-group
                          name="email"
                          label="Email"
                          :disabled="formLocked"
                          class="required"
                      >
                        <b-form-input v-model.trim.lazy="form.email"
                                      :placeholder="placeholders.email"/>
                      </validated-b-form-group>
                      <validated-b-form-group
                          name="message"
                          label="Message"
                          :disabled="formLocked"
                          class="required"
                      >
                        <b-form-textarea v-model.trim.lazy="form.message" rows="5"
                                         :placeholder="placeholders.contact_us_message"/>
                      </validated-b-form-group>

                      <div class="mt-5 d-flex justify-content-end">
                        <b-progress-button
                            size="lg"
                            :disabled="formLocked"
                            :state="formState"
                            default-text="Submit Message"
                            loading-text="Loading..."
                        />
                      </div>
                    </b-form>
                  </validated-b-form-wrapper>
                </b-col>
                <b-col cols="12" offset-sm="4" md="4" offset-md="1" class="contacts">
                  <div class="contacts-group">
                    <div class="contacts-group-title">Email</div>
                    <b-link :href="'mailto:' + email">{{email}}</b-link>
                  </div>
                  <div class="contacts-group">
                    <div class="contacts-group-title">Phone</div>
                    <span>{{phone}}</span>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <site-footer/>
  </div>
</template>

<script>
  import { default as SiteFooter } from '@/core/components/global/Footer'
  import { required } from "vuelidate/lib/validators";
  import maxLength from "vuelidate/lib/validators/maxLength";
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import placeholders from '@/core/constants/placeholders'
  import contacts from '@/core/constants/site-data'
  import http from 'axios'

  export default {
    mixins: [validateFormMixin],
    components: { SiteFooter },
    data: () => ({
      requestHasBeenSent: false,
      email: contacts.contact_email,
      phone: contacts.contact_phone,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        message: '',
      },
      placeholders: placeholders,
    }),
    validations: {
      form: {
        first_name: { required },
        last_name: { required },
        email: { required },
        message: { required, maxLength: maxLength(65535) }
      }
    },
    methods: {
      sendRequest() {
        return http.post('contact-us', this.form)
          .then(() => {
            this.requestHasBeenSent = true
          })
      }
    },
  }
</script>

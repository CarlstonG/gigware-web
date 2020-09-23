<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <validated-b-form-group name="company_name" label="Company Name" :disabled="formLocked">
        <b-form-input
          v-model.trim.lazy="form.company_name"
          :placeholder="placeholders.company_name"
        />
      </validated-b-form-group>
      <validated-b-form-group name="email" label="Email" :disabled="formLocked">
        <b-form-input v-model.trim.lazy="form.email" :placeholder="placeholders.email" />
        <b-button class="mt-2" variant="outline-primary" @click="generateEmail">Generate email</b-button>
      </validated-b-form-group>
      <validated-b-form-group name="password" label="Password" :disabled="formLocked">
        <b-form-input
          v-model.trim.lazy="form.password"
          :placeholder="placeholders.password"
          type="password"
        />
      </validated-b-form-group>
      <validated-b-form-group
        name="password_confirmation"
        label="Confirm password"
        :disabled="formLocked"
      >
        <b-form-input
          v-model.trim.lazy="form.password_confirmation"
          :placeholder="placeholders.password_confirmation"
          type="password"
        />
      </validated-b-form-group>
      <b-form-checkbox v-model="termsAndConds">
        I have read and agree to Gig Wire’s
        <b-link to="/terms">Terms of Service</b-link>
      </b-form-checkbox>
      <b-form-row class="justify-content-end mt-5">
        <b-progress-button
          size="lg"
          :disabled="!termsAndConds || formLocked"
          :state="formState"
          default-text="Submit"
        />
      </b-form-row>
    </b-form>
  </validated-b-form-wrapper>
</template>

<script>
import validations from "../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import placeholders from "@/core/constants/placeholders";
import { mapActions } from "vuex";
import axios from 'axios'

export default {
  mixins: [validateFormMixin],
  data: () => ({
    termsAndConds: false,
    form: {
      email: "",
      password: "",
      password_confirmation: "",
      company_name: "",
    },
    placeholders: placeholders,
  }),
  validations: validations.trackerRegistration,
  methods: {
    ...mapActions("auth", ["registerTracker"]),
    sendRequest() {
      return this.registerTracker(this.form).then(() => {
        this.$router.push({ name: "home" });
      });
    },
      generateEmail() {
        axios.get('https://fakerapi.it/api/v1/users?_quantity=1').then((response)=>{
          this.form.email = response.data.data[0].email;
        })
      },
  },
};
</script>

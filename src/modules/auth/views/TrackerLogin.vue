<template>
  <div>
    <div class="auth">
      <div class="form-card">
        <p>Keep track of your</p>
        <p>working time with us.</p>
        <div class="mb-5">
          <span>If you are a Cabling Partner team member and would like to access our tracking feature, please sign in below.</span>
        </div>
        <validated-b-form-wrapper :validator="$v.form">
          <b-form @submit.prevent="submit">
            <validated-b-form-group name="company_name" label="Company Name" :disabled="formLocked">
              <b-form-input v-model.trim.lazy="form.company_name" />
            </validated-b-form-group>
            <validated-b-form-group name="email" label="Email" :disabled="formLocked">
              <b-form-input v-model.trim.lazy="form.email" />
            </validated-b-form-group>
            <validated-b-form-group name="password" label="Password" :disabled="formLocked">
              <b-form-input v-model.trim.lazy="form.password" type="password" />
            </validated-b-form-group>
            <div class="d-flex justify-content-between">
              <b-form-checkbox v-model="form.remember_me">Keep me logged in</b-form-checkbox>
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
          <b-link :to="{ name: 'tracker-registration' }">Join</b-link>Gig Wire.
        </div>
      </div>
    </div>
    <site-footer />
  </div>
</template>

<script>
import { default as SiteFooter } from "@/core/components/global/Footer";
import validations from "../services/validations";
import validateFormMixin from "@/core/mixins/validate-form-mixin";
import { mapActions } from "vuex";
// import User from "@/core/classes/user";

export default {
  components: { SiteFooter },
  mixins: [validateFormMixin],
  data: () => ({
    form: {
      company_name: "",
      email: "",
      password: "",
      remember_me: false,
    },
  }),
  validations: validations.trackerLogin,
  methods: {
    ...mapActions("auth", ["loginTracker"]),
    sendRequest() {
      return this.loginTracker(this.form).then((data) => {
        localStorage.setItem("tracker", JSON.stringify(data.tracker));
        this.$router.push({ name: "tracker.dashboard" });
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="mb-4 d-flex align-items-center">
      <div class="d-flex align-items-center">
        <div class="vc-bg-blue-200"
             style="width: 54px; height: 19px; border-radius: 10px; margin-right: 20px;"
        ></div>
        <div style="font-size: 22px">Unavailable</div>
      </div>
      <div class="ml-auto">
        <b-button variant="light" @click="cleanUpDates">
          Remove dates
        </b-button>
      </div>
    </div>
    <validated-b-form-wrapper :validator="$v.form">
      <b-form @submit.prevent="submit">
        <validated-b-form-group
            name="dates"
            :disabled="formLocked"
        >
          <availability-picker v-model="form.dates"/>
        </validated-b-form-group>
        <steps-footer :loading="formLocked" :state="formState"/>
      </b-form>
    </validated-b-form-wrapper>
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'
  import AvailabilityPicker from "@/core/components/forms/AvailabilityPicker";
  import validateFormMixin from '@/core/mixins/validate-form-mixin'

  export default {
    mixins: [validateFormMixin],
    components: { AvailabilityPicker, StepsFooter },
    data: () => ({
      form: {
        dates: [],
      },
    }),
    validations: { form: {} },
    methods: {
      ...mapActions('provider', ['createUnavailabilities']),
      sendRequest() {
        const _this = this;
        return this.createUnavailabilities(this.form)
          .then((data) => {
            if (_this.user?.provider_profile) {
              _this.user.provider_profile = { ..._this.user.provider_profile, unavailabilities: { data: data || [] } };
            }

            this.$router.push({ name: 'provider.onboarding.licenses' })
          })
      },
      cleanUpDates() {
        this.form.dates = [];
      }
    },
    computed: {
      ...mapGetters('auth', ['user']),
    },
    created() {
      if (this.user?.provider_profile?.unavailabilities?.data?.length > 1) {
        const dates = this.user?.provider_profile?.unavailabilities.data;
        const start = new Date(dates[dates.length - 1].date);
        const end = new Date(dates[dates.length - 2].date);

        this.form = { ...this.form, dates: { start, end } };
      }
    }
  }
</script>

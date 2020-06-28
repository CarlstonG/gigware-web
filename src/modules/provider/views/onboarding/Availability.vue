<template>
  <div>
    <div class="mb-4 d-flex align-items-center">
      <div class="availability-label">
        <div class="badge"></div>
        <div class="label">Unavailable</div>
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
          <availability-picker v-model="form.dates" :columns="$screens({  default: 1, md: 2, xl: 3  })"/>
        </validated-b-form-group>
        <steps-footer :loading="formLocked" :state="formState"/>
      </b-form>
    </validated-b-form-wrapper>
  </div>
</template>
<style scoped lang="scss" src="./Availability.scss"></style>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions, mapGetters } from 'vuex'
  import AvailabilityPicker from "@/core/components/forms/AvailabilityPicker";
  import validateFormMixin from '@/core/mixins/validate-form-mixin'
  import settingsSaveMixin from '@/modules/provider/mixins/settings-save-behaviour'
  import { convertDatesToSpans, datesToUTC } from "@/core/misc/convert-dates-to-spans";

  export default {
    mixins: [validateFormMixin, settingsSaveMixin],
    components: { AvailabilityPicker, StepsFooter },
    data: () => ({
      form: {
        dates: [],
      }
    }),
    validations: { form: {} },
    methods: {
      ...mapActions('provider', ['createUnavailabilities']),
      sendRequest() {
        const _this = this;

        return this.createUnavailabilities({ ...this.form, dates: datesToUTC(this.form.dates) })
          .then(({ data }) => {
            if (_this.user?.provider_profile) {
              _this.user.provider_profile = { ..._this.user.provider_profile, unavailabilities: { data: data || [] } };
              _this.$store.commit('auth/SET_USER', _this.user);
            }

            _this.afterSubmit()
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
        const dates = this.user?.provider_profile?.unavailabilities.data.map(date => date.date);
        const spans = convertDatesToSpans(dates);

        this.form = { ...this.form, dates: spans };
      }
    }
  }
</script>

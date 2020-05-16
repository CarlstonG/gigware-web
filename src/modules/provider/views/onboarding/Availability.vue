<template>
  <div>
    <div class="mb-4 d-flex align-items-center">
      <div
        style="width: 54px; height: 19px; background-color: #1994db; border-radius: 10px; margin-right: 20px;"
      ></div>
      <div style="font-size: 22px">Unavailable</div>
    </div>
    <v-date-picker
      mode="multiple"
      color="blue"
      v-model="form.dates"
      :min-date="new Date()"
      :columns="$screens({ default: 1, lg: 3 })"
      is-expanded
      is-inline
    />
    <steps-footer @next="submit" :loading="formLocked" :state="formState" />
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions } from 'vuex'

  export default {
    components: { StepsFooter },
    data: () => ({
      form: {
        dates: [],
      },
    }),
    methods: {
      ...mapActions('provider', ['createUnavailabilities']),
      submit() {
        this.createUnavailabilities(this.form)
          .then(() => {
            this.$router.push({ name: 'provider.onboarding.licenses' })
          })
          .catch(error => {
            this.handleServerError(error)
          })
      },
    },
  }
</script>

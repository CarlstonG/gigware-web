<template>
  <div>
    <div class="mb-4 d-flex align-items-center">
      <div
        style="width: 54px; height: 19px; background-color: #1994db; border-radius: 10px; margin-right: 20px;"
      ></div>
      <div style="font-size: 22px">Unavailable</div>
    </div>
    <b-form @submit.prevent="submit">
      <v-date-picker
        mode="multiple"
        color="blue"
        v-model="form.dates"
        :min-date="new Date()"
        :columns="$screens({ default: 1, lg: 3 })"
        is-expanded
        is-inline
      />
      <steps-footer :loading="formLocked" :state="formState" />
    </b-form>
  </div>
</template>

<script>
  import { default as StepsFooter } from '@/modules/provider/components/onboarding/Footer'
  import { mapActions } from 'vuex'

  export default {
    components: { StepsFooter },
    data: () => ({
      formLocked: false,
      formState: 'default',
      form: {
        dates: [],
      },
    }),
    methods: {
      ...mapActions('provider', ['createUnavailabilities']),
      submit() {
        this.formLocked = true
        this.formState = 'loading'

        this.createUnavailabilities(this.form)
          .then(() => {
            this.$router.push({ name: 'provider.onboarding.licenses' })
          })
          .finally(() => {
            this.formLocked = false
            this.formState = 'default'
          })
      },
    },
  }
</script>

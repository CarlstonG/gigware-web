<template>
  <validated-b-form-wrapper :validator="$v.form">
    <b-form @submit.prevent="submit">
      <b-form-row>
        <b-col cols="6">
          <validated-b-form-group
            name="first_name"
            label="First Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.first_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="last_name"
            label="Last Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.last_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="phone_number"
            label="Phone Number"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.phone_number" />
          </validated-b-form-group>
          <validated-b-form-group
            name="company_name"
            label="Company Name"
            :disabled="formLocked"
          >
            <b-form-input v-model.trim.lazy="form.company_name" />
          </validated-b-form-group>
          <validated-b-form-group
            name="team_size"
            label="Team Size"
            :disabled="formLocked"
            class="w-25"
          >
            <b-form-input v-model.trim.lazy="form.team_size" />
          </validated-b-form-group>
        </b-col>
        <b-col cols="6">
          
        </b-col>
      </b-form-row>
    </b-form>
  </validated-b-form-wrapper>
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
        phone_number: '',
        company_name: '',
        team_size: 0,
        profile_photo: null,
      },
    }),
    validations: validations.basicInformation,
    methods: {
      ...mapActions('', []),
    },
  }
</script>

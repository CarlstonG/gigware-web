<template>
    <div>
        <div class="auth">
            <div class="form-card">
                <p class="mb-2">Reset password</p>
                <p class="label-small mb-5" v-if="!isSuccess"> Enter your new password. </p>
                <validated-b-form-wrapper :validator="$v.form" v-if="!isSuccess">
                    <b-form @submit.prevent="submit">
                        <validated-b-form-group
                                name="new_password"
                                label="New password"
                                :disabled="formLocked"
                        >
                            <b-form-input v-model.trim.lazy="form.new_password" />
                        </validated-b-form-group>
                        <validated-b-form-group
                                name="new_password_repeat"
                                label="Enter password again"
                                :disabled="formLocked"
                        >
                            <b-form-input v-model.trim.lazy="form.new_password_repeat" />
                        </validated-b-form-group>
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
                <p class="label-small mb-5" v-if="isSuccess">
                    Password was changed successfully!
                    Now you can login.
                </p>
            </div>
        </div>
        <site-footer />
    </div>
</template>

<script>
    import { default as SiteFooter } from '@/core/components/global/Footer'
    import validations from '../services/validations'
    import validateFormMixin from '@/core/mixins/validate-form-mixin'
    import { mapActions } from 'vuex'

    export default {
        components: { SiteFooter },
        mixins: [validateFormMixin],
        data: () => ({
            form: {
                new_password: '',
                new_password_repeat: '',
                token: ''
            },
            isSuccess: false
        }),
        validations: validations.newPassword,
        methods: {
            ...mapActions('auth', ['newPassword']),
            sendRequest() {
                let that = this;
                return this.newPassword(this.form)
                    .then(() => {
                        that.isSuccess = true;
                    }).catch(() => {
                        this.toast('Token expired')
                    })
            },
        },
        created() {
            this.form.token = this.$route.params.token;
        }
    }
</script>

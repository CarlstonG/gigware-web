<template>
    <div>
        <div class="auth">
            <div class="form-card">
                <p class="mb-2">Forgot password?</p>
                <p class="label-small mb-5"> Enter your email address and we'll send you instructions to reset your password. </p>
                <validated-b-form-wrapper :validator="$v.form" v-if="!isSuccess">
                    <b-form @submit.prevent="submit">
                        <validated-b-form-group
                                name="email"
                                label="Email"
                                :disabled="formLocked"
                        >
                            <b-form-input v-model.trim.lazy="form.email" />
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
                    Recovery email was successfully sent!
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
                email: '',
            },
            isSuccess: false
        }),
        validations: validations.forgot,
        methods: {
            ...mapActions('auth', ['forgot']),
            sendRequest() {
                let that = this;
                return this.forgot(this.form)
                    .then(() => {
                        that.isSuccess = true;
                    }).catch(() => {
                        this.toast('No user with such email was found')
                    })
            },
        },
    }
</script>

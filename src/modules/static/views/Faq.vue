<template>
    <div class="faq-page">
        <pictured-title add-class="title">
            <h1>FAQ</h1>
        </pictured-title>
        <div class="content container-md">
            <b-tabs pills>
                <b-tab>
                    <template v-slot:title>
                        <span class="title-content">
                            General <br>
                            Questions
                        </span>
                    </template>
                    <div class="toggler" @click="openAll('general')">
                        Open all
                    </div>
                    <div v-for="(q, i) in questions.general" v-bind:key="i">
                        <div v-b-toggle="'general-' + i"   class="question">
                            {{ q.question }}
                        </div>
                        <b-collapse :id="'general-' + i" class="mt-2">
                            {{ q.answer }}
                        </b-collapse>
                    </div>
                </b-tab>
                <b-tab title="Second" v-if="questions.cable.length">
                    <template v-slot:title>
                        <span class="title-content">
                            Security Partners <br>
                            Questions
                        </span>
                    </template>
                    <div class="toggler" @click="openAll('cable')">
                        Open all
                    </div>
                    <div v-for="(q, i) in questions.cable" v-bind:key="i">
                        <div v-b-toggle="'cable-' + i"   class="question">
                            {{ q.question }}
                        </div>
                        <b-collapse :id="'cable-' + i" class="mt-2">
                            {{ q.answer }}
                        </b-collapse>
                    </div>
                </b-tab>
                <b-tab title="Third" v-if="questions.customer.length">
                    <template v-slot:title>
                        <span class="title-content">
                            Customer <br>
                            Questions
                        </span>
                    </template>
                    <div class="toggler" @click="openAll('customer')">
                        Open all
                    </div>
                    <div v-for="(q, i) in questions.customer" v-bind:key="i">
                        <div v-b-toggle="'customer-' + i"   class="question">
                            {{ q.question }}
                        </div>
                        <b-collapse :id="'customer-' + i" class="mt-2">
                            {{ q.answer }}
                        </b-collapse>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
        <site-footer/>
    </div>
</template>
<style scoped lang="scss" src="./Faq.scss"></style>

<script>
    import { default as SiteFooter } from '@/core/components/global/Footer'
    import { default as PicturedTitle } from '../components/PicturedTitle'

    export default {
        components: {
            'site-footer': SiteFooter,
            'pictured-title': PicturedTitle
        },
        data: () => ({
            questions: {
                general: [
                    {
                        question: "What is Gig Wire?",
                        answer: "Gig Wire is a platform designed to connect cable installers with customers. Gig wire lets our Security Partners post their contact information, rates, credentials and more for free."
                    },
                    {
                        question: "How does Gig Wire work?",
                        answer: "Both Installers and customers can create an account using the sign-up button at the top of the home page to create an account. Security Partners can post and update their information in their profile. Whereas customers can view the profiles to connect with our Cable Partners"
                    }
                ],
                cable: [
                ],
                customer: [
                ],
            },
            collapseState: {}
        }),
        methods: {
            openAll(prefix) {
                let that = this;
                this.questions[prefix].map((e, i) => {
                    let id = prefix + '-' + i;
                    if (!that.collapseState[id]) {
                        that.$root.$emit('bv::toggle::collapse', id)
                    }
                })
            }
        },
        created() {
            let that = this;
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                that.collapseState[collapseId] = isJustShown;
            })
        }
    }
</script>

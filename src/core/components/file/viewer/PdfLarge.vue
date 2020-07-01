<template>
    <div class="pdf-large">
        <div class="arrows" v-if="withControls">
            <div class="arrow left" @click="setPageRelative(-1)"></div>
            <div class="arrow right" @click="setPageRelative(1)"></div>
        </div>
        <div v-if="fileSrc">
            <pdf
                v-if="fileSrc"
                :src="fileSrc"
                :page="currentPage"
                @num-pages="pageCount = $event"
            />
            <a v-if="link" :href="link" target="_blank">View</a>
        </div>
        <div v-else>
            File not uploaded
        </div>
    </div>
</template>
<style scoped lang="scss" src="./PdfLarge.scss"></style>
<script>
    import pdf from 'vue-pdf'
    export default {
        name: 'PdfLarge',
        components: {
            pdf
        },
        props: {
            fileSrc: {
                type: String,
                default: null
            },
            withControls: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            currentPage: 1,
            pageCount: 0
        }),
        methods: {
            setPageRelative(delta) {
                if (!this.pageCount) {
                    return;
                }
                if (this.currentPage + delta < 1 || this.currentPage + delta > this.pageCount) {
                    return;
                }
                this.currentPage += delta
            }
        },
        computed: {
            srcType() {
                return this.fileSrc ? (
                    this.fileSrc.startsWith('data:application/pdf') ? 'base64' : 'href'
                ) : 'unknown';
            },
            link() {
                return this.srcType === 'base64' ? null : this.fileSrc
            }
        }
    }
</script>
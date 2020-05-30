<template>
    <b-container fluid="" v-bind:class="'pictured-title ' + addClass">
        <slot></slot>
    </b-container>
</template>
<style scoped lang="scss" src="./PicturedTitle.scss"></style>
<script>
    export default {
        props: ['addClass']
    }
</script>
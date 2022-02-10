<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>


    </div>
</template>


<script>


export default {

    data () {
        return {
            loading: false,
        }
    },
}
</script>


<style scoped lang="scss">


</style>

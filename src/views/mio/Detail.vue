<template>
    <div>

        <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4" height="8"></v-progress-linear>

        <v-container fluid>
            <v-row dense>

            </v-row>
        </v-container>

    </div>
</template>


<script>

export default {

    data () {
        return {
            loading: false,
        }
    },

    methods: {

    },

    mounted(){
    }

}
</script>


<style scoped lang="scss">

.v-alert{
  margin: 5px;
}

</style>

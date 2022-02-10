<template>

    <div>
        <v-dialog v-model="dialog" width="1200px">
            <v-card>
                <v-card-title class="text-h5">
                    Use Google's location service?
                </v-card-title>
                <v-card-text>Let Googereleff 33443</v-card-text>
            </v-card>
        </v-dialog>
    </div>

</template>


<script>

    export default{

        data () {
            return {
                dialog: false
            }
        },

        mounted(){

            Event.$on("kap_reconciliation_dialog", (value) => {
                this.dialog = value
            });

        }
    }

</script>

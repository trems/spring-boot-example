<template>
    <v-card class="ma-2">
    <v-layout row wrap>
        <v-container>
            <v-card-actions class="headline">
                <i class="pr-3">({{ message.id }}) </i>{{ message.text }}
                <v-spacer></v-spacer>
                <v-btn icon @click="edit">
                    <v-icon>create</v-icon>
                </v-btn>
                <v-btn icon @click="del">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-layout>
    </v-card>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        name: "MessageRow",
        props: ['message', 'editMessage'],
        methods: {
            ...mapActions(['removeMessageAction']),
            edit() {
                this.editMessage(this.message)
            },
            del() {
                this.removeMessageAction(this.message)
            }

        }
    }
</script>

<style scoped>

</style>
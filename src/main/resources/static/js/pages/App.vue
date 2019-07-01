<template>
<v-app>
    <v-toolbar app dark color="#1E2760">
        <v-toolbar-title class="white--text">
            ExampleFirst
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="profile">
            <div class="my-auto">{{profile.name}}</div>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn icon href="/logout">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
        </v-toolbar-items>


    </v-toolbar>
    <v-content>
        <v-container v-if="!profile">
            Необходимо авторизоваться через <a href="/login">Google</a>
        </v-container>
        <v-container v-else>
            <messages-list/>
        </v-container>

    </v-content>

</v-app>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import MessagesList from 'components/messages/MessagesList.vue'
    import {addHandler} from "util/ws";

    export default {
        name: "App",
        components: {
            MessagesList,
        },
        computed: {
            ...mapState([
                'profile'
            ]),
        },
        methods: {
            ...mapMutations(['addMessageMutation', 'updateMessageMutation', 'removeMessageMutation'])
        },
        created() {
            addHandler(data => {
                if (data.objectType === 'MESSAGE') {
                    switch (data.eventType) {
                        case 'CREATE':
                            this.addMessageMutation(data.body)
                            break
                        case 'UPDATE':
                            this.updateMessageMutation(data.body)
                            break
                        case 'REMOVE':
                            this.removeMessageMutation(data.body)
                            break
                        default:
                            console.log('Looks like event type is unknown : '+data.eventType)
                    }
                }
            })
        }

    }
</script>

<style scoped>

</style>
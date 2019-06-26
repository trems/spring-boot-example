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
            <messages-list :messages="messages"/>
        </v-container>

    </v-content>

</v-app>
</template>

<script>
import MessagesList from 'components/messages/MessagesList.vue'
import {addHandler} from "util/ws.js";
import {getIndex} from "util/collections";

export default {
    name: "App",
    data() {
        return {
            unsortedMessages: frontendData.messages,
            profile: frontendData.profile
        }
    },
    components: {
        MessagesList,
    },
    computed: {
        messages() {
            return this.unsortedMessages.sort((a, b) => (a.id < b.id) ? 1 : -1)
        }
    },
    mounted() {
        addHandler(data => {
            const message = data.body
            const messageIndex = getIndex(this.messages, message.id)

            if (data.deleted) {
                this.messages.splice(messageIndex, 1)
            } else if (messageIndex > -1) {
                this.messages.splice(messageIndex, 1, message)
            } else {
                this.messages.push(message)
            }
        })
    }
}
</script>

<style scoped>

</style>
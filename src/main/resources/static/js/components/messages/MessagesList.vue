<template>
    <div>
    <v-layout align-space-around justify-start column fill-height/>
        <message-form :messages="messages" :editMessage="message"/>
        <div>
            <message-row v-for="message in messages"
                         :message="message"
                         :key="message.id"
                         :editMessage="editMessage"
                         :deleteMessage="deleteMessage">
            </message-row>
        </div>
    </div>
</template>

<script>

    import MessageForm from "./MessageForm.vue";
    import MessageRow from "./MessageRow.vue";
    import {deleteMessage as delMsg} from "util/ws.js";

    export default {
        name: "MessagesList",
        props: ['messages'],
        data() {
            return {
                message: null
            }
        },
        methods: {
            editMessage(message) {
                this.message = message
            },
            deleteMessage(message) {
                delMsg(message)
            }
        },
        components: {
            MessageForm,
            MessageRow
        }
    }
</script>

<style scoped>

</style>
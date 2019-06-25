<template>
    <div>
        <message-form :messages="messages" :editMessage="message"/>
        <div style= "width: 300px;">
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
                // this.$resource('/message{/id}').remove({id : message.id}).then(result => {
                //     if (result.ok) {
                //         this.messages.splice(this.messages.indexOf(message), 1);
                //     }
                // })
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
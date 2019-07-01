<template>
    <div>
    <v-layout align-space-around justify-start column fill-height/>
        <message-form :editMessage="message"/>
        <div>
            <message-row v-for="message in messages"
                         :message="message"
                         :key="message.id"
                         :editMessage="editMessage">
            </message-row>
        </div>
    </div>
</template>

<script>

    import MessageForm from "./MessageForm.vue";
    import MessageRow from "./MessageRow.vue";
    import {mapGetters} from "vuex";
    import {deleteMessage as delMsg} from "util/ws.js";
    import {addHandler} from "util/ws";

    export default {
        name: "MessagesList",
        data() {
            return {
                message: null,
            }
        },
        computed: {
            ...mapGetters([
                'messages'
            ]),
        },
        methods: {
            editMessage(message) {
                this.message = message
            }
        },
        components: {
            MessageForm,
            MessageRow
        },
    }
</script>

<style scoped>

</style>
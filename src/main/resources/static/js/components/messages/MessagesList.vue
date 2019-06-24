<template>
    <div>
        <message-form :messages="messages" :editMessage="message"/>
        <div style= "width: 300px;">
            <message-row v-for="message in messages" :message="message" :key="message.id" :editMessage="editMessage"></message-row>
        </div>
    </div>
</template>

<script>

    import MessageForm from "./MessageForm.vue";
    import MessageRow from "./MessageRow.vue";

    export default {
        name: "MessagesList",
        props: ['messages'],
        data() {
            return {
                message: null
            }
        },
        methods: {
            editMessage: function (message) {
                this.message = message
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
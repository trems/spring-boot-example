<template>
    <div>
        <v-layout row wrap>
            <v-text-field
                    id="message-input"
                    label="Write something..."
                    v-model="text"
                    outline
                    :counter="messageMaxLength"
                    :rules="messageRules"
            ></v-text-field>
            <v-btn
                id="save-message"
                dark
                large
                :disabled="this.text.length > this.messageMaxLength || this.text.length === 0"
                color="#1E2760"
                v-on:click="save"
            >
                Save message
            </v-btn>
        </v-layout>
<!--        <input id="message-input" type="text" placeholder="Write something..." v-model="text">-->
    </div>
</template>

<script>
    import {sendMessage} from "util/ws.js";

    export default {
        name: "MessageForm",
        props: ['messages', 'editMessage'],
        data() {
            return {
                messageMaxLength: 140,
                text : '',
                id: '',
                messageRules: [
                    v => v.length <= this.messageMaxLength || 'Message must be shorter than 140 characters',
                ]
            }
        },
        watch: {
            editMessage(newVal) {
                this.text = newVal.text;
                this.id = newVal.id;
                document.getElementById("message-input").focus();
                if (newVal) {
                    this.$watch('text', function (val) {
                        this.editMessage.text = val
                    })
                }

            },
        },
        methods : {
            save() {
                if (this.text.length <= this.messageMaxLength && this.text.length > 0) {
                    sendMessage({id: this.id, text: this.text})
                    this.text = ''
                    this.id = ''
                } else {
                    console.log('короткое/длинное сообщение')
                }

            }
        }
    }
</script>

<style scoped>
#save-message[disabled] {
    background-color: #1E2760 !important;
    opacity: 0.45;
}
</style>
<template>
    <div>
        <v-layout row wrap>
            <v-textarea
                id="message-input"
                label="Write something..."
                v-model="text"
                outline
                :auto-grow="true"
                rows="1"
                :counter="messageMaxLength"
                :rules="messageRules"
            ></v-textarea>
            <v-btn
                id="save-message"
                dark
                round
                large
                :disabled="btnIsDisabled"
                color="#1E2760"
                v-on:click="save"
            >
                Save message
            </v-btn>
        </v-layout>
    </div>
</template>

<script>
    import {sendMessage} from "util/ws.js";
    import {mapActions} from "vuex";

    export default {
        name: "MessageForm",
        props: ['editMessage'],
        data() {
            return {
                messageMaxLength: 100,
                text : '',
                id: '',
                messageRules: [
                    v => v.length <= this.messageMaxLength || 'Message must be shorter than '+this.messageMaxLength+' characters',
                ]
            }
        },
        computed: {
            btnIsDisabled() {
                return this.text.length > this.messageMaxLength || this.text.length === 0
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
            ...mapActions(['addMessageAction', 'updateMessageAction']),
            save() {
                const message = {
                    id: this.id,
                    text: this.text
                }
                if (this.text.length <= this.messageMaxLength && this.text.length > 0) {
                    if (message.id) {
                        this.updateMessageAction(message)
                    } else {
                        this.addMessageAction(message)
                    }
                    this.text = ''
                    this.id = ''
                } else {
                    console.log('короткое/длинное сообщение')
                }

            },
        }
    }
</script>

<style scoped>
#save-message[disabled] {
    background-color: #1E2760 !important;
    opacity: 0.45;
}
</style>
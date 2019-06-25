<template>
    <div>
        <input id="message-input" type="text" placeholder="Write something..." v-model="text">
        <input type="button" value="Save message" v-on:click="save">
    </div>
</template>

<script>
    import {sendMessage} from "util/ws.js";

    export default {
        name: "MessageForm",
        props: ['messages', 'editMessage'],
        data() {
            return {
                text : '',
                id: '',
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
                sendMessage({id: this.id, text: this.text})
                this.text = ''
                this.id = ''

                // let message = {text: this.text};
                // if (this.text !== '') {
                //     if (this.id) {
                //         this.$resource('/message{/id}').update({id: this.id}, message).then(result => {
                //             result.json().then(data => {
                //                 let messageIndex = this.messages.indexOf(this.editMessage);
                //                 this.messages.splice(messageIndex, 1, data);
                //                 this.text = '';
                //                 this.id = '';
                //             })
                //         })
                //     } else {
                //         this.$resource('/message{/id}').save({}, message).then(result => {
                //             result.json().then(data => {
                //                 this.messages.push(data);
                //                 this.text = ''
                //             })
                //         })
                //     }
                //
                // }

            }
        }
    }
</script>

<style scoped>

</style>
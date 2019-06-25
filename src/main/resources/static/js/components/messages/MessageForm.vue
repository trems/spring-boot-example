<template>
    <div>
        <input id="message-input" type="text" placeholder="Write something..." v-model="text">
        <input type="button" value="Save message" v-on:click="save">
    </div>
</template>

<script>
    export default {
        name: "MessageForm",
        props: ['messages', 'editMessage'],
        data() {
            if (this.editMessage == null) {
                return {
                    text : '',
                    id: ''
                }
            } else {
                return {
                    text : this.editMessage.text,
                    id: this.editMessage.id,
                    reactive: ''
                }
            }

        },
        watch: {
            editMessage(newVal, oldVal) {
                this.text = newVal.text;
                this.id = newVal.id;
                document.getElementById("message-input").focus();
            },
            text(newVal, oldVal) {
                let messageIndex = this.messages.indexOf(this.editMessage)
                this.messages[messageIndex].text = newVal
            }
        },
        methods : {
            save() {
                let message = {text: this.text};
                if (this.text !== '') {
                    if (this.id) {
                        this.$resource('/message{/id}').update({id: this.id}, message).then(result => {
                            result.json().then(data => {
                                let messageIndex = this.messages.indexOf(this.editMessage);
                                this.messages.splice(messageIndex, 1, data);
                                this.text = '';
                                this.id = '';
                            })
                        })
                    } else {
                        this.$resource('/message{/id}').save({}, message).then(result => {
                            result.json().then(data => {
                                this.messages.push(data);
                                this.text = ''
                            })
                        })
                    }

                }

            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div v-if="profile">
            <div>Здравствуйте {{profile.name}}!&nbsp;
                <a href="/logout">Выйти</a>
            </div>
            <messages-list :messages="messages"/>
        </div>
        <div v-else>
            <div >Необходимо авторизоваться через <a href="/login">Google</a></div>
        </div>
    </div>
</template>

<script>
    import MessagesList from 'components/messages/MessagesList.vue'
    import {addHandler} from "util/ws.js";
    import {getIndex} from "util/collections";

    export default {
        name: "App",
        data() {
            return {
                messages: frontendData.messages,
                profile: frontendData.profile
            }
        },
        components: {
            MessagesList,
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
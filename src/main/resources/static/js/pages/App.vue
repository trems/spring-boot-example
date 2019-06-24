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
        }
    }
</script>

<style scoped>

</style>
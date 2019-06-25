<template>
    <div style="display: flex">
        <a v-bind:href="`/message/${message.id}`">
            <li><i>({{ message.id }}) </i>{{ message.text }}</li>
        </a>
        <span style="margin-left: auto">
            <input type="button" value="edit" @click="edit" />
            <input type="button" value="delete" @click="del"/>
        </span>
    </div>
</template>

<script>

    export default {
        name: "MessageRow",
        props: ['message', 'editMessage', 'deleteMessage'],
        methods: {
            edit() {
                this.editMessage(this.message)
            },
            del() {
                this.deleteMessage(this.message)
            }
        }
    }
</script>

<style scoped>

</style>

var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props: ['messages', 'editMessage'],
    data : function () {
      return {
          text : '',
          id: ''
      }
    },
    watch: {
        editMessage: function (newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
            document.getElementById("message-input").focus();
        }
    },
    template: '<div>' +
       '<input id="message-input" type="text" placeholder="Write something..." v-model="text">' +
        '<input type="button" value="Save message" v-on:click="save">' +
       '</div>',
    methods : {
        save : function () {
            let message = {text: this.text};
            if (this.text !== '') {
                if (this.id) {
                    messageApi.update({id: this.id}, message).then(result => {
                        result.json().then(data => {
                            let messageIndex = this.messages.indexOf(this.editMessage);
                            this.messages.splice(messageIndex, 1, data);
                            this.text ='';
                            this.id = '';
                        })
                    })
                } else {
                    messageApi.save({}, message).then(result => {
                        result.json().then(data => {
                            this.messages.push(data);
                            this.text = ''
                        })
                    })
                }

            }

        }
    }
});

Vue.component('message-row', {
    props: ['message', 'editMessage'],
    template: '<div style="display: flex">'+
        '<a v-bind:href="`/message/${message.id}`">' +
        '<li><i>({{ message.id }}) </i>{{ message.text }}</li>' +
        '</a>' +
        '<span style="margin-left: auto">' +
        '<input type="button" value="edit" @click="edit" />' +
        '<input type="button" value="delete" @click="del"/>' +
        '</span>' +
        '</div>',
    methods: {
        edit : function () {
            this.editMessage(this.message)
            // var msgText = window.prompt('Edit message', this.message.text);
            // messageApi.update({id: this.message.id}, {text: msgText}).then(result => {
            //     result.json().then(data => {
            //         this.message.text = data.text;
            //         msgText = ''
            //     })
            // })
            //this.editMethod(this.message);
        },
        del: function () {
            messageApi.remove({id : this.message.id}).then(result => {
                if (result.ok) {
                    app.messages.splice(app.messages.indexOf(this.message), 1);
                }
            })
        }
    }
});

Vue.component('messages-list', {
    props: ['messages'],
    data: function () {
        return {
            message: null
        }
    },
    template: '<div>' +
        '<message-form :messages="messages" :editMessage="message"/>' +
        '<div style= "width: 300px;">' +
        '<message-row v-for="message in messages" :message="message" :key="message.id" :editMessage="editMessage"></message-row>' +
        '</div>' +
        '</div>',
    methods: {
        editMessage: function (message) {
            this.message = message

        }
    }
});

var app = new Vue({
    el: '#app',
    template:
        '<div>' +
            '<div v-if="profile">' +
                '<div>Здравствуйте {{profile.name}}!&nbsp;<a href="/logout">Выйти</Вы></a></div>' +
                '<messages-list :messages="messages"/>' +
            '</div>' +
            '<div v-else>' +
                '<div >Необходимо авторизоваться через <a href="/login">Google</a></div>' +
            '</div>' +
        '</div>',
    data: {
        messages: frontendData.messages,
        profile: frontendData.profile
    },
    created: function () {
        // messageApi.get().then(function (result) {
        //     console.log(result);
        //     app.messages = result.body;
        // })
    }
});
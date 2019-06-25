import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import App from 'pages/App.vue'
import { connect } from "util/ws";

if (frontendData.profile) {
    connect()
}


new Vue({
    el: '#app',
    render: a => a(App)
})


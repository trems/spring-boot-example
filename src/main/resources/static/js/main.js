import Vue from 'vue'
import '@babel/polyfill'
import store from 'store/store.js'
// import VueResource from 'vue-resource'


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from 'pages/App.vue'
import { connect } from "util/ws";


Vue.use(Vuetify)
// Vue.use(VueResource)

if (frontendData.profile) {
    connect()
}


new Vue({
    el: '#app',
    store,
    render: a => a(App)
})


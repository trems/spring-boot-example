import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export const messageApi = Vue.resource('/message{/id}')


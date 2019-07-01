import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


function getMessageIndex(state, message) {
    return state.messages.findIndex(item => item.id === message.id);
}

import { messageApi} from "api/message";

export default new Vuex.Store({
    state: {
        messages: frontendData.messages,
        profile: frontendData.profile
    },
    getters: {
        messages: state => state.messages.sort((a, b) => (a.id < b.id) ? 1 : -1),
    },
    mutations: {
        addMessageMutation(state, message) {
                state.messages = [
                    ...state.messages,
                    message
                ]
        },
        updateMessageMutation(state, message) {
            const messageIndex = getMessageIndex(state, message)

            state.messages.splice(messageIndex, 1, message)

        },
        removeMessageMutation(state, message) {
            const messageIndex = getMessageIndex(state, message)

            if (messageIndex > -1) {
                state.messages.splice(messageIndex, 1)
            }
        }
    },
    actions: {
        async addMessageAction({ commit, state }, message) {
            await messageApi.save({}, message);
            // const data = await result.json()
            // commit('addMessageMutation', data)
        },
        async updateMessageAction({ }, message) {
            await messageApi.update({id: message.id}, message)
            // const data = await result.json()
           //  commit('updateMessageMutation', data)

        },
        async removeMessageAction({ commit }, message) {
            const result = await messageApi.remove({id: message.id})
           //  if (result.ok) {
           // //     commit('removeMessageMutation', message)
           //  }
        },
    }
})
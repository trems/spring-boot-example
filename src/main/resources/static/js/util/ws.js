import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'


let stompClient = null;
const handlers = []

export function connect() {
    stompClient = Stomp.over(() => {
        return new SockJS('/messages-websocket')
    })
    // comment line below to logging
    stompClient.debug = () => {}
    stompClient.connect({}, frame => {
        //console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/activity', message => {
            let data = {
                body: JSON.parse(message.body)
            }
            handlers.forEach(handler => handler(data))
        })
        stompClient.subscribe('/topic/del', message => {
            let data = {
                body: JSON.parse(message.body),
                deleted: true
            }
            handlers.forEach(handler => handler(data))
        })
    })
}


export function addHandler(handler) {
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendMessage(message) {
    stompClient.publish({destination: "/app/changeMessage", body: JSON.stringify(message)})
}
export function deleteMessage(message) {
    stompClient.publish({destination: "/app/deleteMessage", body: JSON.stringify(message)})
}
const socket = io();

export const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}

export const sendShootData = (data) => {
  socketEvent('shoot', data)
}

export const sendTargetData = (data) => {
  socketEvent('targetClicked', data)
}

export const sendName = (data) => {
  socketEvent('nameChanged', data)
}

export const socketListen = (eventName, callback) => {
  socket.on(eventName, callback);
}

export default socket

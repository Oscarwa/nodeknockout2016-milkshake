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
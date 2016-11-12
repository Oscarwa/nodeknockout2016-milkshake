const socket = io();

export const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
  console.log('emitted', eventName, 'with Data', data)
}
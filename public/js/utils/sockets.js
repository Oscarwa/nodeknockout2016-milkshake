var socket = io();

export const socketEvent = (eventName, data) => {
  socket.emit(eventName, data);
}
const { EventEmitter } = require("events");

const firstEmitter = new EventEmitter();

firstEmitter.emit("This is my first event emitter");
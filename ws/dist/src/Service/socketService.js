"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    constructor() {
        console.log("Init socket service...");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
    }
    initListeners() {
        const io = this._io;
        io.on("connect", (socket) => {
            console.log("New Socket connected : ", socket.id);
            socket.on("message", (data) => {
                console.log("Got message from client:", data);
                console.log("Emitting msg:reply to all clients...");
                io.emit("msg:reply", data); // or socket.emit(...) for sender-only
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;

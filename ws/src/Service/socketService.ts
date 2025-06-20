import { Server } from "socket.io";
import { IOperationProps } from "../types/types";

export default class SocketService {
  private _io: Server;
  constructor() {
    console.log("Init socket service...");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this._io;

    io.on("connect", (socket) => {
      console.log("New Socket connected : ", socket.id);

      socket.on("message", (data) => {
        console.log("Got message from client:", data);
        console.log("Emitting msg:reply to all clients...");
        io.emit("msg:reply", data); // or socket.emit(...) for sender-only
      });

      socket.on("event:join", (data) => {
        if (io.of("/").adapter.rooms.get(data.roomID)?.size == 2) {
          socket.emit("event:room:full");
          return;
        }
        socket.join(data.roomID);
        console.log(io.of("/").adapter.rooms);
        const msg = `Successfully joined room : ${data.roomID}`;
        const roomSize = io.of("/").adapter.rooms.get(data.roomID)?.size || 0;
        if (roomSize == 2) {
          socket.to(data.roomID).emit("event:start:call");
        }

        socket.emit("event:room:joined", data.roomID);
      });

      socket.on("event:offer", ({ roomID, offer }) => {
        socket.to(roomID).emit("event:offer:reply", offer);
      });

      socket.on("event:answer", ({ roomID, answer }) => {
        socket.to(roomID).emit("event:answer:reply", answer);
      });

      socket.on("event:ice-candidate", ({ roomID, candidate }) => {
        socket.to(roomID).emit("event:ice-candidate:reply", candidate);
      });

      socket.on("event:end:call", ({ roomID }) => {
        socket.to(roomID).emit("event:end:call:reply");
      });

      socket.on("event:operation", (data: IOperationProps) => {
        const { type, length, position, text, roomID } = data;

        socket.to(roomID).emit("event:operation:reply", data);
      });
    });
  }

  get io() {
    return this._io;
  }
}

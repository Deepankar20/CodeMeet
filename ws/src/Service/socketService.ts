import { Server } from "socket.io";
import { ILanguage, IOperationProps } from "../types/types";

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

      socket.on("message", (data: string) => {
        console.log("Got message from client:", data);
        console.log("Emitting msg:reply to all clients...");
        io.emit("msg:reply", data);
      });

      socket.on("event:join", (data: { roomID: string }) => {
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

      socket.on(
        "event:offer",
        ({ roomID, offer }: { roomID: string; offer: any }) => {
          socket.to(roomID).emit("event:offer:reply", offer);
        }
      );

      socket.on(
        "event:answer",
        ({ roomID, answer }: { roomID: string; answer: any }) => {
          socket.to(roomID).emit("event:answer:reply", answer);
        }
      );

      socket.on(
        "event:ice-candidate",
        ({ roomID, candidate }: { roomID: string; candidate: any }) => {
          socket.to(roomID).emit("event:ice-candidate:reply", candidate);
        }
      );

      socket.on("event:end:call", ({ roomID }: { roomID: string }) => {
        socket.to(roomID).emit("event:end:call:reply");
      });

      socket.on("event:operation", (data: IOperationProps) => {
        const { type, length, position, text, roomID } = data;

        socket.to(roomID).emit("event:operation:reply", data);
      });

      socket.on(
        "event:setLanguage",
        ({ language, roomID }: { language: ILanguage; roomID: string }) => {
          socket.to(roomID).emit("event:setLanguage:reply", language);
        }
      );

      socket.on(
        "event:execute",
        ({ roomID, code }: { roomID: string; code: string }) => {
          socket.to(roomID).emit("event:execute:reply", code);
        }
      );
    });
  }

  get io() {
    return this._io;
  }
}

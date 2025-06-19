"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  checkWS: (msg: string) => void;
  joinRoom: (data: { roomID: string }) => void;
  socket: Socket | null;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");

  return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const checkWS: ISocketContext["checkWS"] = useCallback(
    (msg: string) => {
      if (socket) {
        socket.emit("message", msg);
      }
    },
    [socket]
  );

  const joinRoom: ISocketContext["joinRoom"] = useCallback(
    (data: { roomID: string }) => {
      if (socket) {
        socket.emit("event:join:room", data);
      }
    },
    [socket]
  );

  useEffect(() => {
    const _socket = io("http://localhost:8001");
    _socket.on("connect", () => {
      console.log("Socket connected:", _socket.id);
    });

    _socket.on("msg:reply", (msg) => {
      console.log("msg received:", msg);
    });

    _socket.on("event:room:joined", (msg) => {
      console.log(msg);
    });

    setSocket(_socket);

    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ checkWS, joinRoom, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

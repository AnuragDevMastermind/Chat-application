import { MessageRequest } from "@repo/datamodel/message";
import React, { useEffect, useContext, useState } from "react";
import socketio from "socket.io-client";
import { useAppSelector } from "../hooks/useRedux";

interface SocketIOProviderProps {
  children: JSX.Element;
}

const SocketIOContext = React.createContext({});

export function useSocketIO(): any {
  return useContext(SocketIOContext);
}

export function SocketIOProvider({
  children,
}: SocketIOProviderProps): JSX.Element {
  const { friend } = useAppSelector((state) => state.activeChatSlice);
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );
  const [isOnline, setOnline] = useState(false);

  const initializeSocketConnection = () => {
    const newSocket = socketio("ws://127.0.0.1:8081", {
      withCredentials: true,
    });

    newSocket.on("online-status", (isOnline: boolean) => {
      setOnline(isOnline);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (friend && socket) socket.emit("join-online-room", friend._id);
  }, [friend, socket]);

  const sendMessage = (messageRequest: MessageRequest) => {
    socket?.emit("send-message", messageRequest);
  };

  const value = {
    socket,
    isOnline,
    initializeSocketConnection,
    sendMessage,
  };

  return (
    <SocketIOContext.Provider value={value}>
      {children}
    </SocketIOContext.Provider>
  );
}

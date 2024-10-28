// src/useSocket.js
import { useEffect } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

const useSocket = () => {
  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to the server with ID:", socket.id);
    });

    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useSocket;

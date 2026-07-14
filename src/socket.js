import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectsocket = () => {

  socket.io.opts.query = {
    token: localStorage.getItem("token"),
  };

  

  if (!socket.connected) {
    socket.connect();
  }
};

export default socket;
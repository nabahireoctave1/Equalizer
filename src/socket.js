import { io } from "socket.io-client";

const baseURL = "http://localhost:3000";

const socket = io(baseURL, {
  query: {
    token:localStorage.getItem('token'),
  },
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
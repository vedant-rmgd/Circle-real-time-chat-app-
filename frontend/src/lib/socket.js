import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const socket = io(BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});

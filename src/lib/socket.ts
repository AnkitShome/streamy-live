import { io } from "socket.io-client";
const socket = io(); // uses current origin
export default socket;

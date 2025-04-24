import { Server } from "socket.io";
import { handleConnection } from "../../controllers/socket.controller";

export const setUpSocket = (io: Server) => {
  io.on("connect", handleConnection);
};

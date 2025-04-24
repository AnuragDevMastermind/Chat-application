import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { setUpSocket } from "../router/routes/socket.routes";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: true,
      cors: {
        origin: "http://127.0.0.1:3000", // Update this if your frontend is served from a different URL
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
      },
    });
    setUpSocket(this.io);
  }
}

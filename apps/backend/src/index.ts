import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router/createRouter";
import { connectDB } from "./db/db";
import { ServerSocket } from "./services/socket.services";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);

app.options(
  "*",
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const startServer = () => {
  const server = http.createServer(app);
  new ServerSocket(server);
  server.listen(8081, () => {
    console.log("Server running on http://localhost:8081/");
  });

  app.use("/", router());
};

connectDB()
  .then(startServer)
  .catch((error) => {
    console.error("MONGO db connection failed !!! ", error.message);
  });

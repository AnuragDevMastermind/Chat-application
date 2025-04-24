import { Router } from "express";
import authentication from "./routes/authentication.routes";
import users from "./routes/user.routes";
import conversation from "./routes/conversation.routes";
import message from "./routes/message.routes";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  conversation(router);
  message(router)
  return router;
};

import { Router } from "express";

import { getAllConversations } from "../../controllers/conversation.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";
import { ALL_CONVERSATION_ENDPOINT } from "@repo/utils/endpoints";

export default (router: Router) => {
  router.post(ALL_CONVERSATION_ENDPOINT, LOGGED_IN_USER, getAllConversations);
};

import { Router } from "express";

import { getMessages, getMessagsUsingIds } from "../../controllers/message.controller";
import { MESSAGES_ENDPOINT, MESSAGES_USING_IDS_ENDPOINT } from "@repo/utils/endpoints";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  router.post(`${MESSAGES_ENDPOINT}/:conversationId`, getMessages);
  router.post(MESSAGES_USING_IDS_ENDPOINT, getMessagsUsingIds);
};

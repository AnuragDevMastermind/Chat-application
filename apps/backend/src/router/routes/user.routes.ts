import { Router } from "express";

import {
  getAllUsers,
  getLoggedInUser,
} from "../../controllers/user.controller";
import { LOGGED_IN_USER } from "../../middlewares/auth.middleware";
import {
  ALL_USERS_ENDPOINT,
  LOGGED_IN_USER_ENDPOINT,
} from "@repo/utils/endpoints";

export default (router: Router) => {
  router.post(ALL_USERS_ENDPOINT, LOGGED_IN_USER, getAllUsers);
  router.post(LOGGED_IN_USER_ENDPOINT, getLoggedInUser);
};

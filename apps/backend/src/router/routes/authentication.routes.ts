import { Router } from "express";
import { login, logout, register } from "../../controllers/auth.controller";
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "@repo/utils/endpoints";

export default (router: Router) => {
  router.post(SIGNUP_ENDPOINT, register);
  router.post(LOGIN_ENDPOINT, login);
  router.post(LOGOUT_ENDPOINT, logout);
};
